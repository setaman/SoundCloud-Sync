const { SOCKET_ADDED_JOB, SOCKET_ADD_JOB_FAILED } = require('../../const/socketEvents');
const { default: PQueue } = require('p-queue');

const queue = new PQueue({ concurrency: 3 });

const addJob = async (io, job) => {
  try {
    await queue.add(job);
    io.emit(SOCKET_ADDED_JOB, job);
  } catch (e) {
    console.log(e);
    io.emit(SOCKET_ADD_JOB_FAILED, job);
  }
};

module.exports = {
  addJob
};
