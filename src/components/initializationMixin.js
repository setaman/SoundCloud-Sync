import { SOCKET_INITIALIZATION_START, SOCKET_INITIALIZATION_ERROR, SOCKET_INITIALIZATION_SUCCESS,
  SOCKET_INITIALIZATION_ONDATA, SOCKET_SYNC_STAT_START, SOCKET_SYNC_STAT_SUCCESS, SOCKET_SYNC_STAT_ERROR
} from 'src/background/const/socketEvents.js';
import notificationMixin from 'src/components/notificationMixin';

export default {
  name: 'InitializationMixin',
  mixins: [notificationMixin],
  data: () => ({
    msg: 'Loading data...',
    isLoading: false
  }),
  sockets: {
    [SOCKET_INITIALIZATION_START] () {
      this.msg = 'Loading data...';
      this.isLoading = true;
      this.$store.dispatch('startInitialization');
    },
    [SOCKET_INITIALIZATION_ONDATA] (usersData) {
      this.msg = 'Users data loaded';
      this.onDataLoaded(usersData);
    },
    [SOCKET_INITIALIZATION_SUCCESS] () {
      this.msg = 'All is fine! We are ready to go';
      this.notifySuccess(this.msg);
      this.$store.dispatch('successInitialization');
      this.isLoading = false;
      this.onInitialisationSuccess();
    },
    [SOCKET_INITIALIZATION_ERROR] (msg) {
      this.isLoading = false;
      this.msg = 'Error while loading data. Please check users credentials';
      this.$store.dispatch('failInitialization');
      if (Array.isArray(msg)) {
        msg.forEach(e => {
          this.notifyError(e);
        });
      } else {
        this.notifyError(this.msg);
      }
      if (this.$route.path !== '/settings') {
        setTimeout(() => {
          this.$router.push('settings');
        }, 3000);
      }
    },
    [SOCKET_SYNC_STAT_START] () {
      this.msg = 'Checking synchronization status...';
    },
    [SOCKET_SYNC_STAT_SUCCESS] () {
      this.msg = 'Checking done!!!';
    },
    [SOCKET_SYNC_STAT_ERROR] () {
      this.msg = 'Error while checking synchronization status';
      this.notifyError(this.msg);
    }
  }
};
