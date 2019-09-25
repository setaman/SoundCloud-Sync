<template>
    <div class="jobs-control shadow-20" :class="{expanded: jobs.length > 0}">
      <div class="jobs-control-jobs-container" :class="{expanded: expanded}">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-if="expanded && jobs.length > 0">
            <transition
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
              v-for="(job, i) in jobs"
              :key="i"
            >
              <job :job="job"/>
            </transition>
          </div>
        </transition>
      </div>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div class="jobs-control-container" v-if="jobs.length > 0">
          <div class="flex flex-center">
            <p class="q-ma-none text-bold">
              {{jobsCountMessage}}
            </p>
          </div>
          <div class="flex flex-center">
            <horizontal-progress :progress="progress" :done="progress === 100"/>
          </div>
          <div class="flex flex-center">
            <q-btn v-if="jobs.length > 0" :class="{expanded: expanded}" class="jobs-control-btn" round icon="expand_less"
                   flat color="primary" @click="expanded = !expanded">
            </q-btn>
          </div>
        </div>
      </transition>

      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-h4 alert-header">Oh no, not this again</div>
          </q-card-section>

          <q-card-section class="alert-body">
            Thank you for using this amazing app but you made to many request today. In order to prevent spam behaviour
            SoundCloud blocks such activities.
          </q-card-section>

          <q-card-section class="alert-body">
            Sorry, but <b>{{blockedUser.username}}</b> can not add new favorites until <b>{{period}}</b>.
          </q-card-section>

          <q-card-section>
            <div class="text-h6 alert-header">And what now?</div>
          </q-card-section>

          <q-card-section class="alert-body">
            Clear your browser cache and try to get fresh credentials. Than add new data on settings page and try again.
            <br>
            Good Luck!
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat rounded label="i understand" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
</template>

<script>
import HorizontalProgress from 'components/Base/HorizontalProgress';
import Job from 'components/Jobs/Job';
import { format } from 'date-fns';
const { SOCKET_SYNC_ITEM_ERROR, SOCKET_SYNC_ITEM_SUCCESS, SOCKET_JOB_ADD_SUCCESS, SOCKET_JOB_ADD_ERROR, SOCKET_INITIALIZATION_START,
  SOCKET_JOB_ADD, SOCKET_JOB_EXEC_SUCCESS, SOCKET_JOB_EXEC_START, SOCKET_JOB_EXEC_ERROR, SOCKET_TO_MANY_REQUESTS_ERROR } = require('../../background/const/socketEvents.js');
export default {
  name: 'JobsControl',
  components: { Job, HorizontalProgress },
  data: () => ({
    alert: false,
    blockedUser: '',
    period: '',
    // jobs: [],
    expanded: true
  }),
  sockets: {
    [SOCKET_JOB_ADD] (jobInfo) {
      console.log(SOCKET_JOB_ADD, jobInfo);
    },
    [SOCKET_JOB_ADD_SUCCESS] (jobInfo) {
      console.log(SOCKET_JOB_ADD_SUCCESS, jobInfo);
      this.$store.dispatch('addJob', jobInfo);
    },
    [SOCKET_JOB_EXEC_START] (jobInfo) {
      console.log(SOCKET_JOB_EXEC_START, jobInfo);
    },
    [SOCKET_SYNC_ITEM_SUCCESS] (jobInfo, item) {
      console.log(SOCKET_SYNC_ITEM_SUCCESS, jobInfo, item);
      this.$store.dispatch('updateJob', jobInfo);
    },
    [SOCKET_SYNC_ITEM_ERROR] (jobInfo, item) {
      console.warn(SOCKET_SYNC_ITEM_ERROR, jobInfo, item);
      this.$store.dispatch('updateJob', jobInfo);
    },
    [SOCKET_JOB_EXEC_ERROR] (jobInfo, e) {
      console.warn(SOCKET_JOB_EXEC_ERROR, jobInfo, e);
      this.$store.dispatch('updateJob', jobInfo);
    },
    [SOCKET_TO_MANY_REQUESTS_ERROR] (info) {
      console.warn(SOCKET_TO_MANY_REQUESTS_ERROR, info);
      this.alert = true;
      this.blockedUser = info.blockedUser;
      this.period = format(info.period, 'YYYY-MM-DD HH:MM');
    },
    [SOCKET_JOB_EXEC_SUCCESS] (jobInfo) {
      this.refreshData();
      console.log(SOCKET_JOB_EXEC_SUCCESS, jobInfo);
      this.$store.dispatch('updateJob', jobInfo);
    }
  },
  computed: {
    jobs () {
      return this.$store.state.jobs.jobs;
    },
    progress () {
      const processed = this.jobs.map(job => job.failed ? job.progress.from || 0 : job.progress.done || 0).reduce((acc, jobProcessed) => acc + jobProcessed);
      const from = this.jobs.map(job => job.progress.from || 0).reduce((acc, jobProcessed) => acc + jobProcessed);
      if (from === 0) {
        return 0;
      }
      return processed / from * 100;
    },
    jobsCountMessage () {
      const jobsCount = this.jobs.length;
      return `${jobsCount} Job${jobsCount > 1 ? 's' : ''}`;
    },
    userOne () {
      return this.$store.state.users.userOne;
    },
    userTwo () {
      return this.$store.state.users.userTwo;
    }
  },
  methods: {
    refreshData () {
      // refresh the hole data
      this.$socket.emit(SOCKET_INITIALIZATION_START, {
        userOne: {
          userId: this.userOne.userId,
          token: this.userOne.token,
          clientId: this.userOne.clientId
        },
        userTwo: {
          userId: this.userTwo.userId,
          token: this.userTwo.token,
          clientId: this.userTwo.clientId
        }
      });
    }
  }
};
</script>

<style lang="scss">
  $base_width: 80px;
  $expanded_width: 500px;

  $c_bg: #231c45;
  $c_likes: #ff4966;
  $c_followings: #2069ff;
  $c_playlists: #26ffae;
  $c_settings: #8344ff;

.jobs-control {
  color: white;
  position: fixed;
  bottom: -60px;
  min-height: 60px;
  right: 0;
  transition: 0.5s;
  background-color: $c_bg;
  width: calc(100% - 80px);
  border-left: 2px solid rgba(255, 255, 255, 0.1);
  &.expanded {
    bottom: 0;
  }
}
.jobs-control-container {
  transition: 0.5s;
  display: grid;
  height: 60px;
  grid-template-columns: 80px 1fr 60px;
  grid-column-gap: 10px;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  &.expanded {
    height: 60px;
  }
}
.jobs-control-jobs-container {
  transition: 0.5s;
  max-height: 0;
  overflow-y: hidden;
  &.expanded {
    overflow-y: auto;
    max-height: 240px;
  }
}
.jobs-control-btn {
  transition: 0.5s;
  &.expanded {
    transform: rotate(180deg);
  }
}

.alert-header {
  font-family: Quicksand;
  color: $c_bg;
  font-weight: bold;
}

.alert-body {
  font-family: Quicksand;
  color: $c_bg;
}

.q-dialog .q-card {
  border-radius: 10px;
}
</style>
