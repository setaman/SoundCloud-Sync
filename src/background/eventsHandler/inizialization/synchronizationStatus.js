const calculateItemsSyncPercent = (itemsOne = [], itemsTwo = []) => {
  const uniqIds = new Set([
    ...itemsOne.map(item => item.id),
    ...itemsTwo.map(item => item.id)
  ]);

  const notSynchronized = itemsOne.filter(item => !item.synchronized).length + itemsTwo.filter(item => !item.synchronized).length;

  return uniqIds.size > 0 ? notSynchronized / uniqIds.size * 100 : 0;
};

const determineItemsStatus = (itemsOne = [], itemsTwo = []) => {
  const updatedItemsOne = itemsOne.map(item => ({
    ...item,
    synchronized: itemsTwo.filter(i => i.id === item.id).length > 0
  }));

  const updatedItemsTwo = itemsTwo.map(item => ({
    ...item,
    synchronized: itemsOne.filter(i => i.id === item.id).length > 0
  }));

  console.log(updatedItemsOne.filter(item => !item.synchronized).length);
  console.log(updatedItemsTwo.filter(item => !item.synchronized).length);

  const itemsSyncPercent = Number(calculateItemsSyncPercent(updatedItemsOne, updatedItemsTwo).toFixed(2));

  return {
    updatedItemsOne,
    updatedItemsTwo,
    itemsSyncPercent
  };
};

function determineSyncStatus ({ userOne, userTwo }) {
  const updatedLikesData = determineItemsStatus(userOne.likes, userTwo.likes);
  const updatedFollowingsData = determineItemsStatus(userOne.followings, userTwo.followings);

  return {
    userOne: {
      ...userOne,
      likes: updatedLikesData.updatedItemsOne,
      followings: updatedFollowingsData.updatedItemsOne
    },
    userTwo: {
      ...userOne,
      likes: updatedLikesData.updatedItemsTwo,
      followings: updatedFollowingsData.updatedItemsTwo
    },
    likesSynchronizationPercent: updatedLikesData.itemsSyncPercent,
    followingsSynchronizationPercent: updatedFollowingsData.itemsSyncPercent
  };
}

module.exports = determineSyncStatus;
