const { SOCKET_FAILED_JOB } = require('../../../const/socketEvents');
const { processItems } = require('../processors');
const { getUserItems } = require('../../persistedUsersDataLoding');

const processOneUserJob = async (io, job) => {
  let itemsToSync = [];

  try {
    itemsToSync = await getUserItems({ ...job.query, userId: job.userFrom.userId });
    job.items = itemsToSync;
    job.progress.from = itemsToSync.length;
    processItems(io, job);
  } catch (e) {
    console.error(e);
    io.emit(SOCKET_FAILED_JOB, { ...job, failed: true, pending: false }, e.toString());
  }
};

module.exports = {
  processOneUserJob
};
