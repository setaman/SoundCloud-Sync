<template>
    <div class="jobs-control shadow-20" :class="{expanded: jobs.length > 0}">
      <div class="jobs-control-jobs-container" :class="{expanded: expanded}">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-if="expanded">
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
    </div>
</template>

<script>
import HorizontalProgress from 'components/Base/HorizontalProgress';
import Job from 'components/Jobs/Job';
const { SOCKET_SYNC_ITEM_FAILED, SOCKET_SYNC_ITEM_SUCCESS, SOCKET_ADDED_JOB, SOCKET_ADD_JOB_FAILED,
  SOCKET_ADD_JOB, SOCKET_COMPLETED_JOB, SOCKET_START_JOB, SOCKET_FAILED_JOB, SOCKET_TO_MANY_REQUESTS_ERROR } = require('../../background/const/socketEvents.js');
export default {
  name: 'JobsControl',
  components: { Job, HorizontalProgress },
  data: () => ({
    jobs: [],
    expanded: true
  }),
  sockets: {
    [SOCKET_ADD_JOB] (jobInfo) {
      console.log(SOCKET_ADD_JOB, jobInfo);
    },
    [SOCKET_ADDED_JOB] (jobInfo) {
      console.log(SOCKET_ADDED_JOB, jobInfo);
      this.jobs.unshift(jobInfo);
    },
    [SOCKET_START_JOB] (jobInfo) {
      console.log(SOCKET_START_JOB, jobInfo);
      this.updateJob(jobInfo);
    },
    [SOCKET_SYNC_ITEM_SUCCESS] (jobInfo, item) {
      console.log(SOCKET_SYNC_ITEM_SUCCESS, jobInfo, item);
      this.updateJob(jobInfo);
    },
    [SOCKET_SYNC_ITEM_FAILED] (jobInfo, item) {
      console.warn(SOCKET_SYNC_ITEM_FAILED, jobInfo, item);
      this.updateJob(jobInfo);
    },
    [SOCKET_FAILED_JOB] (jobInfo, e) {
      console.warn(SOCKET_FAILED_JOB, jobInfo, e);
      this.updateJob(jobInfo);
    },
    [SOCKET_TO_MANY_REQUESTS_ERROR] (jobInfo, e) {
      console.warn(SOCKET_TO_MANY_REQUESTS_ERROR, jobInfo, e);
    },
    [SOCKET_COMPLETED_JOB] (jobInfo) {
      console.log(SOCKET_COMPLETED_JOB, jobInfo);
      this.updateJob(jobInfo);
    }
  },
  computed: {
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
    }
  },
  methods: {
    updateJob (updatedJob) {
      for (let i = 0; i < this.jobs.length; i++) {
        if (this.jobs[i].id === updatedJob.id) {
          this.jobs.splice(i, 1, updatedJob);
          break;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
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
</style>
