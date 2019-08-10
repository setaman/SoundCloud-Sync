const { LIST_TYPE_LIKES, LIST_TYPE_FOLLOWINGS } = require('../../../const/const');
const { SOCKET_COMPLETED_JOB, SOCKET_START_JOB, SOCKET_FAILED_JOB } = require('../../../const/socketEvents');
const { processLike, processFollowing } = require('../processors');
const { getUserItems } = require('../../persistedUsersDataLoding');

const wait = (ms = 3000) => new Promise(resolve => setTimeout(resolve, ms));

const chunkJobItems = items => {
  const chunkSize = 10;
  let tempArray = [];

  if (items.length <= chunkSize) {
    return [items.items];
  }

  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    tempArray.push(chunk);
  }

  return tempArray;
};

const processOneUserJob = async (io, job) => {
  console.log(job.query);

  let itemsToSync = [];

  try {
    itemsToSync = await getUserItems({ ...job.query, userId: job.userFrom.userId });
    io.emit(SOCKET_START_JOB, { ...job, processed: 0, from: itemsToSync.length });
  } catch (e) {
    console.error(e);
    io.emit(SOCKET_FAILED_JOB, e.toString());
  }

  const chunkedJobItems = chunkJobItems(itemsToSync);

  switch (job.itemsType) {
    case LIST_TYPE_LIKES:
      for (let chunk of chunkedJobItems) {
        for (let item of chunk) {
          await processLike(io, {
            userTo: job.userTo,
            item
          });
        }
        // Let SC API coll down
        await wait(2000);
      }
      io.emit(SOCKET_COMPLETED_JOB, { ...job, processed: job.items.length, from: job.items.length });
      break;
    case LIST_TYPE_FOLLOWINGS:
      for (let chunk of chunkedJobItems) {
        for (let item of chunk) {
          await processFollowing(io, {
            userTo: job.userTo,
            item
          });
        }
        // Let SC API coll down
        await wait(2000);
      }
      io.emit(SOCKET_COMPLETED_JOB, job);
      break;
  }
};

module.exports = {
  processOneUserJob
};
