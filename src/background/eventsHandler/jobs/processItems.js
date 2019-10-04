const { addUserLike, addUserFollowing } = require('../../soundcloudApi');
const { SOCKET_SYNC_ITEM_SUCCESS, SOCKET_SYNC_ITEM_ERROR, SOCKET_JOB_EXEC_SUCCESS,
  SOCKET_JOB_EXEC_START, SOCKET_JOB_EXEC_ERROR, SOCKET_TO_MANY_REQUESTS_ERROR } = require('../../const/socketEvents');
const { LIST_TYPE_FOLLOWINGS, LIST_TYPE_LIKES, STATUS_ERROR, STATUS_SYNCHRONIZED } = require('../../const/const');
const { clearQueue } = require('./queue');
const { datastore } = require('../../db');

const wait = (ms = 3000) => new Promise(resolve => setTimeout(resolve, ms));
const calculateDelay = itemsCount => Math.log10(itemsCount) * 1000;

const updateItemStatus = (id, status, synchronized) => datastore.update({ id }, { $set: { status, synchronized } },
  { multi: false, returnUpdatedDocs: true });

const processLike = (io, job) => {
  const { userTo, item } = job;
  return addUserLike(userTo.userId, userTo.clientId, item.id, userTo.token)
    .then(async response => {
      console.log('ON RESPONSE:', response.data);
      job.progress.done += 1;
      const updatedItem = await updateItemStatus(item.id, STATUS_SYNCHRONIZED, true);
      io.emit(SOCKET_SYNC_ITEM_SUCCESS, job, updatedItem);
    })
    .catch(async error => {
      console.error('ON ERROR:', error.message);
      job.progress.done += 1;
      const updatedItem = await updateItemStatus(item.id, STATUS_ERROR, false);
      io.emit(SOCKET_SYNC_ITEM_ERROR, job, updatedItem);
      if (error.response && error.response.status === 429) {
        io.emit(SOCKET_TO_MANY_REQUESTS_ERROR, {
          blockedUser: job.userTo,
          period: error.response.data.errors[0].spam_warning.expires_at
        });
        throw Error(error);
      }
    });
};

const processFollowing = (io, job) => {
  const { userTo, item } = job;
  return addUserFollowing(item.id, userTo.token)
    .then(response => {
      console.log(response);
      job.progress.done += 1;
      io.emit(SOCKET_SYNC_ITEM_SUCCESS, job, item);
    })
    .catch(error => {
      console.log(error);
      io.emit(SOCKET_SYNC_ITEM_ERROR, job, item);
    });
};

const chunkJobItems = items => {
  const chunkSize = 10;
  let tempArray = [];

  if (items.length <= chunkSize) {
    return [items];
  }

  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    tempArray.push(chunk);
  }

  return tempArray;
};

const processItems = async (io, job) => {
  job.pending = false;
  job.finished = false;
  job.processing = true;
  io.emit(SOCKET_JOB_EXEC_START, job);

  const chunkedJobItems = chunkJobItems(job.items);

  switch (job.itemsType) {
    case LIST_TYPE_LIKES:
      for (let chunk of chunkedJobItems) {
        try {
          for (let item of chunk) {
            await processLike(io, {
              ...job,
              item
            });
            // Let SC API cool down
            // console.log('delay:', calculateDelay(job.items.length));
            // await wait(2000);
          }
        } catch (e) {
          console.error(SOCKET_TO_MANY_REQUESTS_ERROR, e);
          // Remove all pending jobs
          clearQueue();

          job.failed = true;
          job.processing = false;
          job.pending = false;

          io.emit(SOCKET_JOB_EXEC_ERROR, job, e);
          // cancel job execution
          return;
        }
      }

      job.processing = false;
      job.finished = true;

      io.emit(SOCKET_JOB_EXEC_SUCCESS, job);
      break;
    case LIST_TYPE_FOLLOWINGS:
      for (let chunk of chunkedJobItems) {
        for (let item of chunk) {
          await processFollowing(io, {
            ...job,
            item
          })
            .catch(err => console.error('CATCH SPAM', err));
        }
        // Let SC API coll down
        await wait(2000);
      }
      io.emit(SOCKET_JOB_EXEC_SUCCESS, job);
      break;
  }
};

module.exports = {
  processItems
};
