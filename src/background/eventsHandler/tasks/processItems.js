const { addUserLike, addUserFollowing } = require('../../soundcloudApi');
const { SOCKET_SYNC_ITEM_SUCCESS, SOCKET_SYNC_ITEM_ERROR, SOCKET_TASK_EXEC_SUCCESS,
  SOCKET_TASK_EXEC_START, SOCKET_TASK_EXEC_ERROR, SOCKET_TO_MANY_REQUESTS_ERROR } = require('../../const/socketEvents');
const { LIST_TYPE_FOLLOWINGS, LIST_TYPE_LIKES, STATUS_ERROR, STATUS_SYNCHRONIZED } = require('../../const/const');
const { clearQueue } = require('./queue');
const { datastore } = require('../../db');

const wait = (ms = 3000) => new Promise(resolve => setTimeout(resolve, ms));
const calculateDelay = itemsCount => Math.log10(itemsCount) * 1000;

const updateItemStatus = (id, status, synchronized) => datastore.update({ id }, { $set: { status, synchronized } },
  { multi: false, returnUpdatedDocs: true });

const processLike = (io, task) => {
  const { userTo, item } = task;
  return addUserLike(userTo.userId, userTo.clientId, item.id, userTo.token)
    .then(async response => {
      console.log('ON RESPONSE:', response.data);
      task.progress.done += 1;
      const updatedItem = await updateItemStatus(item.id, STATUS_SYNCHRONIZED, true);
      io.emit(SOCKET_SYNC_ITEM_SUCCESS, task, updatedItem);
    })
    .catch(async error => {
      console.error('ON ERROR:', error.message);
      task.progress.done += 1;
      const updatedItem = await updateItemStatus(item.id, STATUS_ERROR, false);
      io.emit(SOCKET_SYNC_ITEM_ERROR, task, updatedItem);
      if (error.response && error.response.status === 429) {
        io.emit(SOCKET_TO_MANY_REQUESTS_ERROR, {
          blockedUser: task.userTo,
          period: error.response.data.errors[0].spam_warning.expires_at
        });
        throw Error(error);
      }
    });
};

const processFollowing = (io, task) => {
  const { userTo, item } = task;
  return addUserFollowing(item.id, userTo.token)
    .then(response => {
      console.log(response);
      task.progress.done += 1;
      io.emit(SOCKET_SYNC_ITEM_SUCCESS, task, item);
    })
    .catch(error => {
      console.log(error);
      io.emit(SOCKET_SYNC_ITEM_ERROR, task, item);
    });
};

const chunkTaskItems = items => {
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

const processItems = async (io, task) => {
  task.pending = false;
  task.finished = false;
  task.processing = true;
  io.emit(SOCKET_TASK_EXEC_START, task);

  const chunkedTaskItems = chunkTaskItems(task.items);

  switch (task.itemsType) {
    case LIST_TYPE_LIKES:
      for (let chunk of chunkedTaskItems) {
        try {
          for (let item of chunk) {
            await processLike(io, {
              ...task,
              item
            });
            // Let SC API cool down
            // console.log('delay:', calculateDelay(task.items.length));
            // await wait(2000);
          }
        } catch (e) {
          console.error(SOCKET_TO_MANY_REQUESTS_ERROR, e);
          // Remove all pending Tasks
          clearQueue();

          task.failed = true;
          task.processing = false;
          task.pending = false;

          io.emit(SOCKET_TASK_EXEC_ERROR, task, e);
          // cancel task execution
          return;
        }
      }

      task.processing = false;
      task.finished = true;

      io.emit(SOCKET_TASK_EXEC_SUCCESS, task);
      break;
    case LIST_TYPE_FOLLOWINGS:
      for (let chunk of chunkedTaskItems) {
        for (let item of chunk) {
          await processFollowing(io, {
            ...task,
            item
          })
            .catch(err => console.error('CATCH SPAM', err));
        }
        // Let SC API coll down
        await wait(2000);
      }
      io.emit(SOCKET_TASK_EXEC_SUCCESS, task);
      break;
  }
};

module.exports = {
  processItems
};
