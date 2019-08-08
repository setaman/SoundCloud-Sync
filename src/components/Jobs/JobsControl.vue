<template>
    <div class="jobs-control shadow-20">
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
      <div class="jobs-control-container">
        <div class="flex flex-center">
          <p class="q-ma-none">
            status
          </p>
        </div>
        <div class="flex flex-center">
          <horizontal-progress />
        </div>
        <div class="flex flex-center">
          <q-btn :class="{expanded: expanded}" class="jobs-control-btn" round icon="expand_less" flat color="primary" @click="expanded = !expanded"></q-btn>
        </div>
      </div>
    </div>
</template>

<script>
import HorizontalProgress from 'components/Base/HorizontalProgress';
import Job from 'components/Jobs/Job';
const { SOCKET_SYNC_ITEM_FAILED, SOCKET_SYNC_ITEM_SUCCESS, SOCKET_ADDED_JOB, SOCKET_ADD_JOB_FAILED,
  SOCKET_ADD_JOB, SOCKET_COMPLETED_JOB } = require('../../background/const/socketEvents.js');
export default {
  name: 'JobsControl',
  components: { Job, HorizontalProgress },
  data: () => ({
    jobs: [],
    expanded: false
  }),
  sockets: {
    [SOCKET_ADD_JOB] (jobInfo) {
      console.log('ADDED JOB', jobInfo);
      this.jobs.push(jobInfo);
    },
    [SOCKET_ADDED_JOB] (jobInfo) {
      console.log('ADDED JOB', jobInfo);
      this.jobs.push(jobInfo);
    },
    [SOCKET_SYNC_ITEM_SUCCESS] (jobInfo) {
      console.log('ITEM SYNC SUCCESS', jobInfo);
    },
    [SOCKET_COMPLETED_JOB] (jobInfo) {
      console.log('JOB COMPLETED', jobInfo);
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
  min-height: 60px;
  bottom: 0;
  right: 0;
  background-color: $c_bg;
  width: calc(100% - 80px);
  border-left: 2px solid rgba(255, 255, 255, 0.1);
}
.jobs-control-container {
  display: grid;
  height: 60px;
  grid-template-columns: 60px 1fr 60px;
  grid-column-gap: 10px;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
}
.jobs-control-jobs-container {
  transition: 0.5s;
  max-height: 0px;
  overflow-y: auto;
  &.expanded {
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
