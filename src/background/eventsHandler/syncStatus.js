import { datastore } from '../db';
import { SOCKET_SYNC_STAT_ONDATA, SOCKET_SYNC_STAT_ERROR } from '../const/socketEvents';

const getSyncStatus = async io => {
  try {
    const syncStatusData = await datastore.findOne({ type: 'syncStatusInfo' });
    io.emit(SOCKET_SYNC_STAT_ONDATA, syncStatusData);
  } catch (e) {
    console.error(e);
    io.emit(SOCKET_SYNC_STAT_ERROR, e.toString());
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
    io.emit(SOCKET_SYNC_STAT_ONDATA, {
      likesSyncPercent,
      followingsSyncPercent,
      overallSyncPercent
    });
  } catch (e) {
    console.error(e);
    io.emit(SOCKET_SYNC_STAT_ERROR, e.toString());
  }
};

export {
  getSyncStatus,
  updateSyncStatus
};
