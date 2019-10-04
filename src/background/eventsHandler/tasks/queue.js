const { SOCKET_TASK_ADD_ERROR } = require('../../const/socketEvents');
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
  console.log('[ QUEUE ]: all task are done!');
})();

const clearQueue = () => queue.clear();

const addQueueTask = async (io, task, taskMethod) => {
  try {
    queue.add(() => {
      taskMethod();
    });
  } catch (e) {
    console.log(e);
    io.emit(SOCKET_TASK_ADD_ERROR, task);
  }
};

module.exports = {
  addQueueTask,
  clearQueue,
  queue
};
