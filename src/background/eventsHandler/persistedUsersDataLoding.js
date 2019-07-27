const { SOCKET_USER_LIKES, SOCKET_USER_LIKES_ERROR } = require('../const/socketEvents');
const { datastore } = require('../db');
const { LIST_SORT_OPTION_ALPHABETIC, LIST_SORT_OPTION_NEWEST, LIST_SORT_OPTION_OLDEST, LIST_SORT_OPTION_STATUS } = require('../const/const');

const formulateSort = sortOption => {
  switch (sortOption) {
    case LIST_SORT_OPTION_ALPHABETIC:
      return {
        title: 1
      };
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

const getUserLikes = async (io, { userId, title, status, sort, page = 1 }) => {
  const filter = {
    type: 'likes',
    userId,
    $or: [
      {
        title: new RegExp(`${title}`, 'i')
      },
      {
        'user.username': new RegExp(`${title}`, 'i')
      }
    ],
    status: { $in: status }
  };

  console.log('FILTERS:', filter, formulateSort(sort), page);

  const pageSize = 30;

  try {
    const likes = await datastore.find(filter).sort(formulateSort(sort)).skip(pageSize * (page - 1)).limit(pageSize).exec();
    const itemsCount = await countItems(filter);
    io.emit(SOCKET_USER_LIKES, {
      userId,
      items: likes,
      from: itemsCount,
      page,
      pages: itemsCount > pageSize ? countItemsPages(itemsCount, pageSize) : 1
    });
  } catch (e) {
    console.error(e);
    io.emit(SOCKET_USER_LIKES_ERROR, {
      userId,
      error: e.toString()
    });
  }
};

module.exports = {
  getUserLikes
};
