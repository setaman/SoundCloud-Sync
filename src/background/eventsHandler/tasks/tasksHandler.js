const { JOB_TYPE_ALL, JOB_TYPE_ONE, JOB_TYPE_ONE_USER, JOB_TYPE_SELECTED } = require('../../const/const');
const { processAllTask } = require('./tasksTypesHanlder/handleAllTask');
const { processOneAndSelectedTask } = require('./tasksTypesHanlder/handleOneTaskAndSelectedTask');
const { processOneUserTask } = require('./tasksTypesHanlder/handleOneUserTask');
const { addQueueTask } = require('./queue');

const processTask = async (io, task) => {
  switch (task.type) {
    case JOB_TYPE_ALL:
      processAllTask(io, task);
      break;
    case JOB_TYPE_ONE:
      processOneAndSelectedTask(io, task);
      break;
    case JOB_TYPE_SELECTED:
      processOneAndSelectedTask(io, task);
      break;
    case JOB_TYPE_ONE_USER:
      processOneUserTask(io, task);
      break;
  }
};

const handleTask = (io, task) => addQueueTask(io, task, () => processTask(io, task));

module.exports = {
  handleTask
};
