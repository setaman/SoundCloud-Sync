const { SOCKET_USER_LIKES, SOCKET_USER_LIKES_ERROR } = require('../socketEvents');
const { datastore } = require('../db');

const getUserLikes = async (io, { userId, title, status, sort }) => {
  console.log('GETTING LIKES FOR USER: ', userId, title, status, sort);

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
    ]
    // title: /all/
  };
  console.log('FILTERS:', filter);

  try {
    const likes = await datastore.find(filter).sort({ order: -1 }).limit(20).exec();
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
