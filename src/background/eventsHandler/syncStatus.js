const { datastore } = require('../db');
const { SOCKET_SYNC_STATUS_DATA, SOCKET_SYNC_STATUS_FAIL } = require('../socketEvents');

const getSyncStatus = async io => {
  try {
    const syncStatusData = await datastore.findOne({ type: 'syncStatusInfo' });
    io.emit(SOCKET_SYNC_STATUS_DATA, syncStatusData);
  } catch (e) {
    console.error(e);
    io.emit(SOCKET_SYNC_STATUS_FAIL, e.toString());
  }
};

const updateSyncStatus = async (io, { likesSyncPercent, followingsSyncPercent, overallSyncPercent }) => {
  try {
    await datastore.update({ type: 'syncStatusInfo' }, {
      type: 'syncStatusInfo',
      likesSyncPercent,
      followingsSyncPercent,
      overallSyncPercent
    });
    io.emit(SOCKET_SYNC_STATUS_DATA, {
      likesSyncPercent,
      followingsSyncPercent,
      overallSyncPercent
    });
  } catch (e) {
    console.error(e);
    io.emit(SOCKET_SYNC_STATUS_FAIL, e.toString());
  }
};

module.exports = {
  getSyncStatus,
  updateSyncStatus
};
