const { TASK_TYPE_FILTERED, TASK_TYPE_SELECTED } = require('../../const/const');
const { SOCKET_TASK_ADD_ERROR, SOCKET_TASK_ADD_SUCCESS } = require('../../const/socketEvents');
const { processFilteredTaskType } = require('./tasksTypesHanlder/handleFilteredTaskType');
const { processSelectedTaskType } = require('./tasksTypesHanlder/handleSelectedTaskType');
const { addQueueTask } = require('./queue');

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

module.exports = {
  handleTask
};
