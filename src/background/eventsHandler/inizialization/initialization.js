const { SOCKET_INITIALIZATION_ERROR, SOCKET_INITIALIZATION_START, SOCKET_INITIALIZATION_SUCCESS, SOCKET_INITIALIZATION_ONDATA,
  SOCKET_SYNC_STAT_START, SOCKET_SYNC_STAT_SUCCESS, SOCKET_SYNC_STAT_ERROR } = require('../../const/socketEvents');
const { loadUserData } = require('../../userDataLoader');
const { datastore, clear } = require('../../db');
const determineSyncStatus = require('./determineSyncStatus');

const persistUserData = (userId, likes, followings, playlists) => {
  const likesToPersist = likes.map(like => ({ userId, type: 'likes', ...like }));
  const followingsToPersist = followings.map(following => ({ userId, type: 'following', ...following }));
  return datastore.insert([likesToPersist, followingsToPersist, playlists]);
};

const sanitizeUsersDataResponse = ({ userOne, userTwo }) => ({
  userOne: {
    ...userOne,
    permalink_url: userOne.permalink_url,
    followings: userOne.followings.length,
    likes: userOne.likes.length,
    playlists: userOne.playlists.length
  },
  userTwo: {
    ...userTwo,
    permalink_url: userTwo.permalink_url,
    followings: userTwo.followings.length,
    likes: userTwo.likes.length,
    playlists: userTwo.playlists.length
  }
});

const loadUsersData = async (userOne, userTwo) => {
  const result = await Promise.all([loadUserData(userOne.userId, userOne.clientId, userOne.token),
    loadUserData(userTwo.userId, userTwo.clientId, userTwo.token)
  ]);

  if (result[0].errors.length > 0 || result[1].errors.length > 0) {
    return new Promise((resolve, reject) => reject([...result[0].errors, ...result[1].errors]));
  }

  const loadedUserOne = result.find(data => data.userId === userOne.userId);
  const loadedUserTwo = result.find(data => data.userId === userTwo.userId);

  console.log('USER ONE', loadedUserOne.userId);
  console.log('USER TWO', loadedUserTwo.userId);

  return {
    userOne: {
      ...loadedUserOne
    },
    userTwo: {
      ...loadedUserTwo
    }
  };
};

const init = async (io, msg) => {
  io.emit(SOCKET_INITIALIZATION_START, msg);

  let usersData;

  try {
    usersData = await loadUsersData(msg.userOne, msg.userTwo);
    io.emit(SOCKET_INITIALIZATION_ONDATA, sanitizeUsersDataResponse(usersData));
  } catch (e) {
    console.log(e);
    io.emit(SOCKET_INITIALIZATION_ERROR, e);
    return;
  }

  try {
    io.emit(SOCKET_SYNC_STAT_START);
    const { userOne, userTwo, likesSyncPercent, followingsSyncPercent, playlistsSyncPercent,
      overallSyncPercent
    } = determineSyncStatus(usersData);
    // clear db before persisting new data
    await clear();

    await Promise.all([
      persistUserData(userOne.userId, userOne.likes, userOne.followings, userOne.playlists),
      persistUserData(userTwo.userId, userTwo.likes, userTwo.followings, userTwo.playlists)
    ]);

    await datastore.insert({
      type: 'syncStatusInfo',
      overallSyncPercent,
      likesSyncPercent,
      followingsSyncPercent,
      playlistsSyncPercent
    });

    io.emit(SOCKET_SYNC_STAT_SUCCESS);
    io.emit(SOCKET_INITIALIZATION_SUCCESS);
  } catch (e) {
    console.log(e);
    io.emit(SOCKET_SYNC_STAT_ERROR, e);
    io.emit(SOCKET_INITIALIZATION_ERROR, e);
  }
};

module.exports = {
  init
};
