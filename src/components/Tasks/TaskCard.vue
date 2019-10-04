<template>
<div class="task-card q-pb-xl q-mb-xl q-mx-md">
  <div class="task-card-content">
    <div class="task-card-title flex justify-between q-mt-none q-mb-xs">
      <div>
        <h6 class="q-ma-none">
          {{ task.title}}
        </h6>
      </div>
      <div class="task-card-controls">
        <q-btn v-if="!task.processing" round flat icon="close" color="red" @click="removeTask"></q-btn>
        <q-btn v-if="!task.processing" round flat icon="refresh" color="green" @click="restartTask"></q-btn>
        <q-btn v-else round flat icon="stop" color="red"></q-btn>
      </div>
    </div>
    <div class="task-card-progress q-mb-md" >
      <horizontal-progress :progress="progress" :error="task.failed" :pending="task.pending" :done="task.finished"/>
    </div>
    <div class="task-card-info-container row">
      <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 q-col-gutter-md">
        <div class="flex justify-start">
          <div class="task-card-info-value">
            <user-link :username="task.userFrom.username" :url="task.userFrom.permalink_url"/>
          </div>
          <div class="task-card-info q-px-md">
            <q-icon size="ms" color="primary" name="fas fa-angle-double-right"/>
          </div>
          <div class="task-card-info-value">
            <user-link :username="task.userTo.username" :url="task.userTo.permalink_url"/>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 q-col-gutter-md">
        <div class="flex justify-start">
          <div class="task-card-info-value q-px-md">
            <q-icon size="ms" color="primary" name="fas fa-stream"/>
          </div>
          <div class="task-card-info-value">
            {{task.progress.done}} / {{task.progress.from}}
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 q-col-gutter-md">
        <div class="flex justify-start">
          <div class="task-card-info-value q-px-md">
            <q-icon size="ms" color="primary" name="fas fa-calendar-alt"/>
          </div>
          <div class="task-card-info-value">
            {{taskDate}}
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 q-col-gutter-md">
        <div class="flex justify-start">
          <div class="task-card-info-value q-px-md">
            <q-icon size="ms" color="primary" name="fas fa-fingerprint"/>
          </div>
          <div class="task-card-info-value">
            {{task.id}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import HorizontalProgress from 'components/Base/HorizontalProgress';
const { SOCKET_JOB_ADD } = require('../../background/const/socketEvents.js');
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';
import UserLink from 'components/Base/UserLink';

export default {
  name: 'TaskCard',
  components: { UserLink, HorizontalProgress },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  computed: {
    progress () {
      const processed = this.task.progress.done || 0;
      const from = this.task.progress.from || 0;
      if (from === 0) {
        return 0;
      }
      return processed / from * 100;
    },
    taskDate () {
      return `${formatDistanceToNow(parseISO(this.task.date, { addSuffix: true }))} ago`;
    }
  },
  methods: {
    removeTask () {
      this.$emit('removeTask', this.task);
    },
    restartTask () {
      this.$emit('restartTask', this.task);
    }
  }
};
</script>

<style scoped lang="scss">
.task-card {
  // border-radius: 10px;
  // margin: 20px 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}
.task-card-info {
  color: #eaeaea;
}
.task-card-info-value {
  font-weight: bold;
}
</style>
