const { addUserLike, addUserFollowing } = require('../../soundcloudApi');

const processLike = job => {
  const { userTo, item } = job;
  return addUserLike(userTo.userId, userTo.clientId, item.id, userTo.token);
};

const processFollowing = job => {
  const { userTo, item } = job;
  return addUserFollowing(item.id, userTo.token);
};

module.exports = {
  processFollowing,
  processLike
};
