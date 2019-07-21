const { SOCKET_USER_LIKES, SOCKET_USER_LIKES_ERROR } = require('../socketEvents');
const { datastore } = require('../db');
const { LIST_SORT_OPTION_ALPHABETIC, LIST_SORT_OPTION_NEWEST, LIST_SORT_OPTION_OLDEST, LIST_SORT_OPTION_STATUS } = require('../const');

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

const getUserLikes = async (io, { userId, title, status, sort }) => {
  // console.log('GETTING LIKES FOR USER: ', userId, title, status, sort);

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

  console.log('FILTERS:', filter, formulateSort(sort));

  try {
    const likes = await datastore.find(filter).sort(formulateSort(sort)).limit(20).exec();
    io.emit(SOCKET_USER_LIKES, {
      userId,
      likes
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
