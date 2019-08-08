const { SOCKET_ADDED_JOB, SOCKET_ADD_JOB_FAILED } = require('../../const/socketEvents');
const { processJob } = require('./jobsHandler');
const { default: PQueue } = require('p-queue');

const queue = new PQueue({ concurrency: 3 });

queue.on('active', () => {
  console.log(`[ QUEUE ]!!! Size: ${queue.size}  Pending: ${queue.pending}`);
});

const addJob = async (io, job) => {
  console.log(job);
  try {
    queue.add(() => {
      io.emit(SOCKET_ADDED_JOB, { ...job, processed: 0, from: job.items.length });
      processJob(io, job);
    });
  } catch (e) {
    console.log(e);
    io.emit(SOCKET_ADD_JOB_FAILED, job);
  }
};

module.exports = {
  addJob
};
