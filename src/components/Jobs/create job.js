const uniqid = require('uniqid');

export const createJob = (type, itemsType, items = [], userFrom, userTo, query = {}) => ({
  id: uniqid(),
  date: Date(),
  type,
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
