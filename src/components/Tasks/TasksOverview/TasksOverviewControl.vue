<template>
    <div class="jobs-control shadow-20" :class="{expanded: tasks.length > 0}">
      <div class="jobs-control-jobs-container" :class="{expanded: expanded}">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-if="expanded && tasks.length > 0">
            <transition
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
              v-for="(task, i) in tasks"
              :key="i"
            >
              <simple-task :task="task"/>
            </transition>
          </div>
        </transition>
      </div>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div class="jobs-control-container" v-if="tasks.length > 0">
          <div class="flex flex-center">
            <p class="q-ma-none text-bold">
              <router-link class="tasks-status-link" to="/home/tasks">
                {{jobsCountMessage}}
              </router-link>
            </p>
          </div>
          <div class="flex flex-center">
            <horizontal-progress :progress="progress" :done="progress === 100"/>
          </div>
          <div class="flex flex-center">
            <q-btn v-if="tasks.length > 0" :class="{expanded: expanded}" class="jobs-control-btn" round icon="expand_less"
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
import SimpleTask from 'components/Tasks/TasksOverview/SimpleTask';
import { format } from 'date-fns';
import { SOCKET_SYNC_ITEM_ERROR, SOCKET_SYNC_ITEM_SUCCESS, SOCKET_TASK_ADD_SUCCESS, SOCKET_TASK_ADD_ERROR, SOCKET_INITIALIZATION_START,
  SOCKET_TASK_ADD, SOCKET_TASK_EXEC_SUCCESS, SOCKET_TASK_EXEC_START, SOCKET_TASK_EXEC_ERROR, SOCKET_TO_MANY_REQUESTS_ERROR
} from 'src/background/const/socketEvents.js';
export default {
  name: 'TasksOverviewControl',
  components: { SimpleTask, HorizontalProgress },
  data: () => ({
    alert: false,
    blockedUser: '',
    period: '',
    // tasks: [],
    expanded: false
  }),
  sockets: {
    [SOCKET_TASK_ADD] (taskInfo) {
      console.log(SOCKET_TASK_ADD, taskInfo);
    },
    [SOCKET_TASK_ADD_SUCCESS] (taskInfo) {
      console.log(SOCKET_TASK_ADD_SUCCESS, taskInfo);
      if (!this.taskAlreadyAdded(taskInfo.id)) {
        this.$store.dispatch('addTask', taskInfo);
      }
    },
    [SOCKET_TASK_ADD_ERROR] (taskInfo, e) {
      console.log(SOCKET_TASK_ADD_ERROR, taskInfo, e);
    },
    [SOCKET_TASK_EXEC_START] (taskInfo) {
      console.log(SOCKET_TASK_EXEC_START, taskInfo);
      this.$store.dispatch('updateTask', taskInfo);
    },
    [SOCKET_SYNC_ITEM_SUCCESS] (taskInfo, item) {
      console.log(SOCKET_SYNC_ITEM_SUCCESS, taskInfo, item);
      this.$store.dispatch('updateTask', taskInfo);
    },
    [SOCKET_SYNC_ITEM_ERROR] (taskInfo, item) {
      console.warn(SOCKET_SYNC_ITEM_ERROR, taskInfo, item);
      this.$store.dispatch('updateTask', taskInfo);
    },
    [SOCKET_TASK_EXEC_ERROR] (taskInfo, e) {
      console.warn(SOCKET_TASK_EXEC_ERROR, taskInfo, e);
      this.$store.dispatch('updateTask', taskInfo);
    },
    [SOCKET_TO_MANY_REQUESTS_ERROR] (info) {
      console.warn(SOCKET_TO_MANY_REQUESTS_ERROR, info);
      this.alert = true;
      this.blockedUser = info.blockedUser;
      this.period = format(info.period, 'YYYY-MM-DD HH:MM');
    },
    [SOCKET_TASK_EXEC_SUCCESS] (taskInfo) {
      this.refreshData();
      console.log(SOCKET_TASK_EXEC_SUCCESS, taskInfo);
      this.$store.dispatch('updateTask', taskInfo);
    }
  },
  computed: {
    tasks () {
      return this.$store.state.tasks.tasks;
    },
    progress () {
      const processed = this.tasks.map(task => task.failed ? task.progress.from || 0 : task.progress.done || 0)
        .reduce((acc, jobProcessed) => acc + jobProcessed);
      const from = this.tasks.map(task => task.progress.from || 0).reduce((acc, jobProcessed) => acc + jobProcessed);
      if (from === 0) {
        return 0;
      }
      return processed / from * 100;
    },
    jobsCountMessage () {
      const jobsCount = this.tasks.length;
      return `${jobsCount} Task${jobsCount > 1 ? 's' : ''}`;
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
    },
    taskAlreadyAdded (taskId) {
      return this.tasks.map(({ id }) => id).includes(taskId);
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
.tasks-status-link {
  color: $c_followings;
  text-decoration: none;
  transition: 0.3s;
  &:hover {
    color: $c_settings;
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
