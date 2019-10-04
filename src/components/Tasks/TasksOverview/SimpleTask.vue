<template>
  <div class="job">
    <div class="flex flex-center">
      <p class="q-ma-none">
        {{task.progress.done}} / {{ task.progress.from }}
      </p>
    </div>
    <div class="flex flex-center">
      <horizontal-progress :progress="progress" :error="task.failed" :pending="task.pending" :done="task.finished"/>
    </div>
    <div class="flex flex-center">
      <q-btn v-if="task.failed" round icon="refresh" flat color="primary"></q-btn>
      <q-btn round icon="close" flat color="red" @click="removeTask(task)"></q-btn>
    </div>
  </div>
</template>

<script>
import HorizontalProgress from 'components/Base/HorizontalProgress';
export default {
  name: 'SimpleTask',
  components: { HorizontalProgress },
  props: {
    task: {
      type: [Object, Number],
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
    }
  },
  methods: {
    removeTask (task) {
      this.$store.dispatch('removeTask', task);
    }
  }
};
</script>

<style scoped lang="scss">
.job{
  display: grid;
  height: 60px;
  width: 100%;
  grid-template-columns: 150px 1fr 100px;
  grid-column-gap: 10px;
}
</style>
