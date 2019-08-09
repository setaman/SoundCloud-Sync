const { SOCKET_USER_LIKES, SOCKET_USER_LIKES_ERROR } = require('../const/socketEvents');
const { datastore } = require('../db');
const { LIST_SORT_OPTION_ALPHABETIC, LIST_SORT_OPTION_NEWEST, LIST_SORT_OPTION_OLDEST,
  LIST_SORT_OPTION_STATUS, LIST_TYPE_LIKES } = require('../const/const');

const formulateSort = (sortOption, type) => {
  switch (sortOption) {
    case LIST_SORT_OPTION_ALPHABETIC:
      return type === LIST_TYPE_LIKES ? { title: 1 } : { username: 1 };
    case LIST_SORT_OPTION_NEWEST:
      return {
        order: 1
      };
    case LIST_SORT_OPTION_OLDEST:
      return {
        order: -1
      };
    case LIST_SORT_OPTION_STATUS:
      return {
        status: -1
      };
    default:
      return {
        order: -1
      };
  }
};

const countItems = filter => datastore.count(filter);
const countItemsPages = (itemsCount, pageSize) => Math.ceil((itemsCount / pageSize));

const getUserItems = async (io, { type, userId, title, status, sort, page = 1 }) => {
  const filter = {
    type,
    userId,
    $or: [
      {
        title: new RegExp(`${title}`, 'i')
      },
      {
        'user.username': new RegExp(`${title}`, 'i')
      },
      {
        username: new RegExp(`${title}`, 'i')
      }
    ],
    status: { $in: status }
  };
  const pageSize = 30;

  console.log('FILTERS AFTER:', filter, formulateSort(sort, type), page);

  try {
    const items = await datastore.find(filter).sort(formulateSort(sort)).skip(pageSize * (page - 1)).limit(pageSize).exec();
    const itemsCount = await countItems(filter);

    if (io) {
      io.emit(SOCKET_USER_LIKES, {
        userId,
        items: items,
        from: itemsCount,
        page,
        pages: itemsCount > pageSize ? countItemsPages(itemsCount, pageSize) : 1
      });
    }
  } catch (e) {
    console.error(e);
    if (io) {
      io.emit(SOCKET_USER_LIKES_ERROR, {
        userId,
        error: e.toString()
      });
    }
  }
};

module.exports = {
  getUserLikes: getUserItems
};
