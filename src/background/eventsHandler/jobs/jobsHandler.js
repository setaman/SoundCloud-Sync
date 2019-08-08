const { JOB_TYPE_ALL, JOB_TYPE_LIKES, JOB_TYPE_FOLLOWINGS } = require('../../const/const');
const { SOCKET_SYNC_ITEM_SUCCESS, SOCKET_SYNC_ITEM_FAILED } = require('../../const/socketEvents');
const { processAllJob } = require('./handleAllJob');
const { processLikes, processFollowing } = require('./processors');

const chunkJobItems = job => {
  const chunkSize = 10;
  let tempArray = [];

  if (job.items.length <= chunkSize) {
    return job.items;
  }

  for (let i = 0; i < job.items.length; i += chunkSize) {
    const chunk = job.items.slice(i, i + chunkSize);
    tempArray.push(chunk);
  }

  return tempArray;
};

const processJob = async (io, job) => {
  if (job.type === JOB_TYPE_ALL) {
    processAllJob(io, job);
  } else {
    const chunkedJobItems = chunkJobItems(job);

    switch (job.type) {
      case JOB_TYPE_LIKES:
        for (let chunk of chunkedJobItems) {
          const promises = chunk.map(item => processLikes({
            userTo: job.userTo,
            item
          })
            .then(response => {
              console.log(response);
              io.emit(SOCKET_SYNC_ITEM_SUCCESS, job.id, item);
            })
            .catch(error => {
              console.log(error);
              io.emit(SOCKET_SYNC_ITEM_FAILED, job.id, item);
            })
          );
          await Promise.all(promises);
        }
        break;
      case JOB_TYPE_FOLLOWINGS:
        for (let chunk of chunkedJobItems) {
          const promises = chunk.map(item => processFollowing({
            userTo: job.userTo,
            item
          })
            .then(response => {
              console.log(response);
              io.emit(SOCKET_SYNC_ITEM_SUCCESS, job.id, item);
            })
            .catch(error => {
              console.log(error);
              io.emit(SOCKET_SYNC_ITEM_FAILED, job.id, item);
            })
          );
          await Promise.all(promises);
        }
        break;
    }
  }
};

module.exports = {
  processJob
};
