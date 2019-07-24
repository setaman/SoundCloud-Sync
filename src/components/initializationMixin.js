import { SOCKET_INITIALIZATION_START, SOCKET_INITIALIZATION_FAIL, SOCKET_INITIALIZATION_SUCCESS,
  SOCKET_INITIALIZATION_DATA_LOADED, SOCKET_SYNC_STATUS_START, SOCKET_SYNC_STATUS_SUCCESS, SOCKET_SYNC_STATUS_FAIL
} from 'src/utils/socketEvents.js';
import notificationMixin from 'src/components/notificationMixin';

export default {
  name: 'InitializationMixin',
  mixins: [notificationMixin],
  data: () => ({
    msg: 'Loading data...',
    isLoading: false
  }),
  sockets: {
    connect: function () {
      console.log('socket connected');
    },
    [SOCKET_INITIALIZATION_START] () {
      this.msg = 'Loading data...';
      this.isLoading = true;
      this.$store.dispatch('startInitialization');
    },
    [SOCKET_INITIALIZATION_DATA_LOADED] (usersData) {
      this.msg = 'Users data loaded';
      this.notifySuccess(this.msg);
      this.onDataLoaded(usersData);
    },
    [SOCKET_INITIALIZATION_SUCCESS] () {
      this.msg = 'We are ready to go';
      this.notifySuccess(this.msg);
      this.$store.dispatch('successInitialization');
      this.isLoading = false;
      this.onInitialisationSuccess();
    },
    [SOCKET_INITIALIZATION_FAIL] (msg) {
      this.isLoading = false;
      this.msg = 'Error while loading data';
      this.$store.dispatch('failInitialization');
      if (Array.isArray(msg)) {
        msg.forEach(e => {
          this.notifyError(e);
        });
      } else {
        this.notifyError(this.msg);
      }
      setTimeout(() => {
        this.$router.push('settings');
      }, 3000);
    },
    [SOCKET_SYNC_STATUS_START] () {
      this.msg = 'Checking synchronization status...';
      this.notifySuccess(this.msg);
    },
    [SOCKET_SYNC_STATUS_SUCCESS] () {
      this.msg = 'Checking done!!!';
      this.notifySuccess(this.msg);
    },
    [SOCKET_SYNC_STATUS_FAIL] () {
      this.msg = 'Error while checking synchronization status';
      this.notifyError(this.msg);
    }
  }
};
