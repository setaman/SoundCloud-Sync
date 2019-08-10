const { LIST_TYPE_LIKES, LIST_TYPE_FOLLOWINGS } = require('../../../const/const');
const { SOCKET_SYNC_ITEM_SUCCESS, SOCKET_SYNC_ITEM_FAILED, SOCKET_COMPLETED_JOB,
  SOCKET_START_JOB } = require('../../../const/socketEvents');
const { processLike, processFollowing } = require('../processors');

const chunkJobItems = job => {
  const chunkSize = 10;
  let tempArray = [];

  if (job.items.length <= chunkSize) {
    return [job.items];
  }

  for (let i = 0; i < job.items.length; i += chunkSize) {
    const chunk = job.items.slice(i, i + chunkSize);
    tempArray.push(chunk);
  }

  return tempArray;
};

const processOneAndSelectedJob = async (io, job) => {
  io.emit(SOCKET_START_JOB, { ...job, processed: 0, from: job.items.length });
  const chunkedJobItems = chunkJobItems(job);

  switch (job.itemsType) {
    case LIST_TYPE_LIKES:
      for (let chunk of chunkedJobItems) {
        const promises = chunk.map(item => processLike(io, {
          userTo: job.userTo,
          item
        }));
        await Promise.all(promises);
      }
      io.emit(SOCKET_COMPLETED_JOB, { ...job, processed: job.items.length, from: job.items.length });
      break;
    case LIST_TYPE_FOLLOWINGS:
      for (let chunk of chunkedJobItems) {
        const promises = chunk.map(item => processFollowing(io, {
          userTo: job.userTo,
          item
        }));
        await Promise.all(promises);
      }
      io.emit(SOCKET_COMPLETED_JOB, job);
      break;
  }
};

module.exports = {
  processOneAndSelectedJob
};
