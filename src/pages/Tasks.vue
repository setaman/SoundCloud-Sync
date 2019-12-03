<template>
  <q-page id="tasks" v-scroll="onScroll">
    <div id="task-controls" class="q-pa-md" :class="{'shadow-5': position > 70}">
      <div id="task-controls-content" class="">
        <q-btn class="q-mr-sm" :disable="tasks.length < 1 || someTasksIsProcessing" icon="refresh" color="primary" flat @click="restartAll">restart all</q-btn>
        <q-btn class="q-mr-sm" :disable="tasks.length < 1 || someTasksIsProcessing" icon="close" color="red" flat @click="removeAll">remove all</q-btn>
      </div>
    </div>
    <div id="tasks-container">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
        <div v-if="tasks.length < 1" class="text-center">
          <empty-animation dark>
            <p>
              No more tasks left
            </p>
          </empty-animation>
        </div>
      </transition>
      <transition-group name="list-item" tag="div">
        <task-card v-for="task in tasks" :key="task.id" :task="task" @removeTask="removeTask" @restartTask="restartTask"/>
      </transition-group>
    </div>
  </q-page>
</template>

<script>
import TaskCard from 'components/Tasks/TaskCard';
import scrollObserverMixin from 'components/scrollObserverMixin';
import { SOCKET_TASK_ADD } from 'src/background/const/socketEvents.js';
import EmptyAnimation from 'components/Base/EmptyAnimation';

export default {
  name: 'Tasks',
  mixins: [scrollObserverMixin],
  components: { EmptyAnimation, TaskCard },
  computed: {
    tasks () {
      return this.$store.state.tasks.tasks;
    },
    someTasksIsProcessing () {
      return this.$store.getters.someTasksIsProcessing;
    }
  },
  methods: {
    restartAll () {
      for (const task of this.tasks) {
        this.restartTask(task);
      }
    },
    removeAll () {
      this.$store.dispatch('clearTasks');
    },
    removeTask (task) {
      this.$store.dispatch('removeTask', task);
    },
    restartTask (task) {
      const progress = {
        done: 0,
        from: task.progress.from
      };
      this.$socket.emit(SOCKET_TASK_ADD, { ...task, date: new Date(), progress });
    }
  }
};
</script>

<style scoped lang="scss">
  $c_bg: #231c45;
  $c_likes: #ff4966;
  $c_followings: #2069ff;
  $c_playlists: #26ffae;
  $c_settings: #8344ff;

#tasks {
  position: relative;
  padding: 0 0 16px 0;
  background-color: $c_bg;
  border-left: 2px solid rgba(255, 255, 255, 0.1);
  color: white;
}
#tasks-container {
  padding-top: 86px;
}
#task-controls {
  position: fixed;
  width: 100%;
  background-color: $c_bg;
  z-index: 2;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}
  .list-item-enter, .list-item-leave-to {
    opacity: 0;
    transform: translatex(30px);
  }
  .list-item-leave-active {
    position: absolute;
  }

</style>
