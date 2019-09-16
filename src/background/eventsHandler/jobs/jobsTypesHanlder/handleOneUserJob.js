const { SOCKET_JOB_EXEC_ERROR } = require('../../../const/socketEvents');
const { processItems } = require('../processItems');
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
    io.emit(SOCKET_JOB_EXEC_ERROR, { ...job, failed: true, pending: false }, e.toString());
  }
};

module.exports = {
  processOneUserJob
};
