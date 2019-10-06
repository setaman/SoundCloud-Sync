import { TASK_TYPE_FILTERED, TASK_TYPE_SELECTED } from '../../const/const';
import { SOCKET_TASK_ADD_ERROR, SOCKET_TASK_ADD_SUCCESS } from '../../const/socketEvents';
import { processFilteredTaskType } from './tasksTypesHanlder/handleFilteredTaskType';
import { processSelectedTaskType } from './tasksTypesHanlder/handleSelectedTaskType';
import { addQueueTask } from './queue';

const processTask = async (io, task) => {
  switch (task.taskType) {
    case TASK_TYPE_FILTERED:
      io.emit(SOCKET_TASK_ADD_SUCCESS, task);
      processFilteredTaskType(io, task);
      break;
    case TASK_TYPE_SELECTED:
      io.emit(SOCKET_TASK_ADD_SUCCESS, task);
      processSelectedTaskType(io, task);
      break;
    default:
      console.error('Unknown task type');
      io.emit(SOCKET_TASK_ADD_ERROR, task, 'Unknown task type');
  }
};

const handleTask = (io, task) => addQueueTask(io, task, () => processTask(io, task));

export {
  handleTask
};
