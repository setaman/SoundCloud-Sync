const { SOCKET_USER_LIKES, SOCKET_USER_LIKES_ERROR } = require('../socketEvents');
const { datastore } = require('../db');

const getUserLikes = async (io, userId) => {
  console.log('GETTING LIKES FOR USER: ', userId);

  try {
    const likes = await datastore.find({ type: 'likes', userId }).sort({ order: -1 }).limit(20).exec();
    io.emit(SOCKET_USER_LIKES, {
      userId,
      likes
    });
  } catch (e) {
    io.emit(SOCKET_USER_LIKES_ERROR, {
      userId,
      error: e
    });
  }
};

module.exports = {
  getUserLikes
};
