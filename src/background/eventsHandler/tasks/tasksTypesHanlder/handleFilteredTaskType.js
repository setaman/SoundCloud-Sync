import { SOCKET_TASK_EXEC_ERROR } from '../../../const/socketEvents';
import { processItems } from '../processItems';
import { getUserItems } from '../../persistedUsersDataLoding';

const processFilteredTaskType = async (io, task) => {
  let itemsToSync = [];

  try {
    itemsToSync = await getUserItems({ ...task.query, userId: task.userFrom.userId });
    // task.items = itemsToSync;
    task.progress.from = itemsToSync.length;
    processItems(io, { ...task, items: itemsToSync });
  } catch (e) {
    console.error(e);
    io.emit(SOCKET_TASK_EXEC_ERROR, { ...task, failed: true, pending: false }, e.toString());
  }
};

export {
  processFilteredTaskType
};
