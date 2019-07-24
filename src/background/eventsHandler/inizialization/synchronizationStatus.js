const getSetFromArray = array => new Set(array);

const calculateItemsSyncPercent = (itemsOne = [], itemsTwo = []) => {
  const uniqIds = getSetFromArray([
    ...itemsOne.map(item => item.id),
    ...itemsTwo.map(item => item.id)
  ]);

  const notSynchronizedCount = itemsOne.filter(item => !item.synchronized).length + itemsTwo.filter(item => !item.synchronized).length;

  console.log('Items percent', (100 - uniqIds.size > 0 ? notSynchronizedCount / uniqIds.size * 100 : 0));

  return {
    itemsSyncPercent: 100 - (uniqIds.size > 0 ? notSynchronizedCount / uniqIds.size * 100 : 0),
    notSynchronizedCount
  };
};

const calculateOverallSyncPercent = (userOne, userTwo, notSynchronizedLikes, notSynchronizedFollowings) => {
  const uniqLikesIds = new Set([
    ...userOne.likes.map(item => item.id),
    ...userTwo.likes.map(item => item.id)
  ]);

  const uniqFollowingsIds = new Set([
    ...userOne.followings.map(item => item.id),
    ...userTwo.followings.map(item => item.id)
  ]);

  const uniqIdsCount = uniqLikesIds.size + uniqFollowingsIds.size;
  const notSynchronized = notSynchronizedLikes + notSynchronizedFollowings;

  console.log('OVERALL percent', 100 - (uniqIdsCount.size > 0 ? notSynchronized / uniqIdsCount.size * 100 : 0));

  return 100 - (uniqIdsCount.size > 0 ? notSynchronized / uniqIdsCount.size * 100 : 0);
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

  const { itemsSyncPercent, notSynchronizedCount } = calculateItemsSyncPercent(updatedItemsOne, updatedItemsTwo);

  return {
    updatedItemsOne,
    updatedItemsTwo,
    notSynchronizedCount,
    itemsSyncPercent: Number(itemsSyncPercent.toFixed(2))
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
    followingsSynchronizationPercent: updatedFollowingsData.itemsSyncPercent,
    overallSynchronizationPercent: calculateOverallSyncPercent(
      userOne, userTwo,
      updatedLikesData.notSynchronizedCount,
      updatedFollowingsData.notSynchronizedCount
    )
  };
}

module.exports = determineSyncStatus;
