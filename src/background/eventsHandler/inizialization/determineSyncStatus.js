const calculateItemsSyncPercent = (itemsOne = [], itemsTwo = []) => {
  const uniqIds = new Set([
    ...itemsOne.map(item => item.id),
    ...itemsTwo.map(item => item.id)
  ]);

  const notSynchronizedCount = itemsOne.filter(item => !item.synchronized).length + itemsTwo.filter(item => !item.synchronized).length;

  return {
    itemsSyncPercent: 100 - (uniqIds.size > 0 ? notSynchronizedCount / uniqIds.size * 100 : 0),
    notSynchronizedCount
  };
};

const calculateOverallSyncPercent = (userOne, userTwo, notSynchronizedLikes, notSynchronizedFollowings, notSynchronizedPlaylists) => {
  const uniqLikesIds = new Set([
    ...userOne.likes.map(item => item.id),
    ...userTwo.likes.map(item => item.id)
  ]);

  const uniqFollowingsIds = new Set([
    ...userOne.followings.map(item => item.id),
    ...userTwo.followings.map(item => item.id)
  ]);

  const uniqPlaylistsIds = new Set([
    ...userOne.playlists.map(item => item.id),
    ...userTwo.playlists.map(item => item.id)
  ]);

  const uniqIdsCount = uniqLikesIds.size + uniqFollowingsIds.size + uniqPlaylistsIds.size;
  const notSynchronized = notSynchronizedLikes + notSynchronizedFollowings + notSynchronizedPlaylists;

  const overallSyncPercent = 100 - (uniqIdsCount > 0 ? notSynchronized / uniqIdsCount * 100 : 0);

  return Number(overallSyncPercent.toFixed(2));
};

const determineItemsStatus = (itemsOne = [], itemsTwo = []) => {
  const updatedItemsOne = itemsOne.map(item => {
    const synchronized = itemsTwo.filter(i => i.id === item.id).length > 0;
    return {
      ...item,
      synchronized,
      status: synchronized ? 'synchronized' : 'waiting'
    };
  });

  const updatedItemsTwo = itemsTwo.map(item => {
    const synchronized = itemsOne.filter(i => i.id === item.id).length > 0;
    return {
      ...item,
      synchronized,
      status: synchronized ? 'synchronized' : 'waiting'
    };
  });

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
  const updatedPlaylistsData = determineItemsStatus(userOne.playlists, userTwo.playlists);

  return {
    userOne: {
      ...userOne,
      likes: updatedLikesData.updatedItemsOne,
      playlists: updatedPlaylistsData.updatedItemsOne,
      followings: updatedFollowingsData.updatedItemsOne
    },
    userTwo: {
      ...userOne,
      likes: updatedLikesData.updatedItemsTwo,
      playlists: updatedPlaylistsData.updatedItemsTwo,
      followings: updatedFollowingsData.updatedItemsTwo
    },
    likesSyncPercent: updatedLikesData.itemsSyncPercent,
    followingsSyncPercent: updatedFollowingsData.itemsSyncPercent,
    playlistsSyncPercent: updatedPlaylistsData.itemsSyncPercent,
    overallSyncPercent: calculateOverallSyncPercent(
      userOne, userTwo,
      updatedLikesData.notSynchronizedCount,
      updatedFollowingsData.notSynchronizedCount,
      updatedPlaylistsData.notSynchronizedCount
    )
  };
}

export { determineSyncStatus };
