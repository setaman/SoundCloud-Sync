const { SOCKET_TASK_ADD_SUCCESS, SOCKET_TASK_ADD_ERROR } = require('../../const/socketEvents');
const { default: PQueue } = require('p-queue');

const queue = new PQueue({ concurrency: 1 });

queue.on('active', () => {
  console.log(`[ QUEUE ]!!! Size: ${queue.size}  Pending: ${queue.pending}`);
});

(async () => {
  await queue.onEmpty();
  console.log('[ QUEUE ]: queue is empty');
})();

(async () => {
  await queue.onIdle();
  console.log('[ QUEUE ]: all jobs are done!');
})();

const clearQueue = () => queue.clear();

const addQueueJob = async (io, job, jobFunction) => {
  try {
    queue.add(() => {
      io.emit(SOCKET_TASK_ADD_SUCCESS, job);
      jobFunction();
    });
  } catch (e) {
    console.log(e);
    io.emit(SOCKET_TASK_ADD_ERROR, job);
  }
};

module.exports = {
  addQueueJob,
  clearQueue,
  queue
};
