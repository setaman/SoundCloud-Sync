const uniqid = require('uniqid');

export const createTask = (taskType, itemsType, items = [], userFrom, userTo, query = {}) => ({
  id: uniqid(),
  date: new Date(),
  taskType,
  title: generateTitle(itemsType),
  itemsType,
  items,
  query,
  userFrom,
  userTo,
  progress: {
    done: 0,
    from: items.length
  },
  pending: true,
  processing: false,
  finished: false,
  failed: false
});

const generateTitle = itemsType => `Sync ${itemsType}`;
