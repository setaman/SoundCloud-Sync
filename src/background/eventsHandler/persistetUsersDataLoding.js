const { SOCKET_USER_LIKES, SOCKET_USER_LIKES_ERROR } = require('../socketEvents');
const { datastore } = require('../db');

const getUserLikes = async (io, userId, sort = { order: -1 }) => {
  console.log('GETTING LIKES FOR USER: ', userId, sort);

  try {
    const likes = await datastore.find({ type: 'likes', userId }).sort(sort).limit(20).exec();
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
