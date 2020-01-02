import { SOCKET_TASK_ADD_ERROR } from '../../const/socketEvents';
const { default: PQueue } = require('p-queue');

const queue = new PQueue({ concurrency: 1 });

queue.on('active', () => {
  console.log(`[ QUEUE ]!!! Size: ${queue.size}  Pending: ${queue.pending}`);
});

const clearQueue = () => queue.clear();

const addQueueTask = async (io, task, taskMethod) => {
  try {
    queue.add(() => {
      taskMethod();
    });
  } catch (e) {
    console.error(e);
    io.emit(SOCKET_TASK_ADD_ERROR, task);
  }
};

export {
  addQueueTask,
  clearQueue,
  queue
};
