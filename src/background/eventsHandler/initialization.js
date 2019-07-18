const { SOCKET_INITIALIZATION_FAIL, SOCKET_INITIALIZATION_START, SOCKET_INITIALIZATION_SUCCESS } = require('../socketEvents');
const { loadUserData } = require('../userDataLoader');
const { datastore, clear } = require('../db');

const persistUserData = (userId, likes, followings) => {
  const likesToPersist = likes.map(like => ({ userId, type: 'likes', ...like }));
  const followingsToPersist = followings.map(following => ({ userId, type: 'following', ...following }));
  // console.log('PERSIST', followingsToPersist);
  return datastore.insert([likesToPersist, followingsToPersist]);
};

const loadUsersData = async (userOne, userTwo) => {
  const result = await Promise.all([loadUserData(userOne.userId, userOne.clientId, userOne.token),
    loadUserData(userTwo.userId, userTwo.clientId, userTwo.token)
  ]);

  if (result[0].errors.length > 0 || result[1].errors.length > 0) {
    return new Promise((resolve, reject) => reject([...result[0].errors, ...result[1].errors]));
  }

  const loadedUserOne = result.find(data => data.user.userId === userOne.userId);
  const loadedUserTwo = result.find(data => data.user.userId === userTwo.userId);

  console.log('USER ONE', loadedUserOne.user.username);
  console.log('USER TWO', loadedUserTwo.user.username);

  // clear db before persisting new data
  await clear();

  await Promise.all([
    persistUserData(loadedUserOne.user.userId, loadedUserOne.likes, loadedUserOne.followings),
    persistUserData(loadedUserTwo.user.userId, loadedUserTwo.likes, loadedUserTwo.followings)
  ]);

  return {
    userOne: {
      ...userOne,
      username: loadedUserOne.user.username,
      avatar_url: loadedUserOne.user.avatar_url,
      permalink_url: loadedUserOne.user.permalink_url,
      followings: loadedUserOne.followings.length,
      likes: loadedUserOne.likes.length,
      playlists: loadedUserOne.playlists.length
    },
    userTwo: {
      ...userTwo,
      username: loadedUserTwo.user.username,
      avatar_url: loadedUserTwo.user.avatar_url,
      permalink_url: loadedUserTwo.user.permalink_url,
      followings: loadedUserTwo.followings.length,
      likes: loadedUserTwo.likes.length,
      playlists: loadedUserTwo.playlists.length
    }
  };
};

const init = (io, msg) => {
  console.log(SOCKET_INITIALIZATION_START, msg);
  io.emit(SOCKET_INITIALIZATION_START, msg);

  loadUsersData(msg.userOne, msg.userTwo)
    .then((data) => io.emit(SOCKET_INITIALIZATION_SUCCESS, data))
    .catch(e => {
      console.log(e);
      io.emit(SOCKET_INITIALIZATION_FAIL, e);
    });
};

module.exports = {
  init
};
