const { SOCKET_TASK_EXEC_ERROR } = require('../../../const/socketEvents');
const { processItems } = require('../processItems');
const { getUserItems } = require('../../persistedUsersDataLoding');

const processOneUserTask = async (io, task) => {
  let itemsToSync = [];

  try {
    itemsToSync = await getUserItems({ ...task.query, userId: task.userFrom.userId });
    task.items = itemsToSync;
    task.progress.from = itemsToSync.length;
    processItems(io, task);
  } catch (e) {
    console.error(e);
    io.emit(SOCKET_TASK_EXEC_ERROR, { ...task, failed: true, pending: false }, e.toString());
  }
};

module.exports = {
  processOneUserTask
};
