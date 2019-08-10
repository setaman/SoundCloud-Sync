const { addUserLike, addUserFollowing } = require('../../soundcloudApi');
const { SOCKET_SYNC_ITEM_SUCCESS, SOCKET_SYNC_ITEM_FAILED } = require('../../const/socketEvents');

const processLike = (io, job) => {
  const { userTo, item } = job;
  return addUserLike(userTo.userId, userTo.clientId, item.id, userTo.token)
    .then(response => {
      console.log('ON RESPONSE:', response.data);
      io.emit(SOCKET_SYNC_ITEM_SUCCESS, job, item);
    })
    .catch(error => {
      console.log('ON ERROR:', error.message);
      io.emit(SOCKET_SYNC_ITEM_FAILED, job, item);
    });
};

const processFollowing = (io, job) => {
  const { userTo, item } = job;
  return addUserFollowing(item.id, userTo.token)
    .then(response => {
      console.log(response);
      io.emit(SOCKET_SYNC_ITEM_SUCCESS, job, item);
    })
    .catch(error => {
      console.log(error);
      io.emit(SOCKET_SYNC_ITEM_FAILED, job, item);
    });
};

module.exports = {
  processFollowing,
  processLike
};
