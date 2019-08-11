<template>
  <div class="job">
    <div class="flex flex-center">
      <p class="q-ma-none">
        {{job.progress.done}} / {{ job.progress.from }}
      </p>
    </div>
    <div class="flex flex-center">
      <horizontal-progress :progress="progress" :error="job.failed" :pending="job.pending" :done="job.finished"/>
    </div>
    <div class="flex flex-center">
      <q-btn v-if="job.failed" round icon="refresh" flat color="primary"></q-btn>
      <q-btn round icon="close" flat color="red"></q-btn>
    </div>
  </div>
</template>

<script>
import HorizontalProgress from 'components/Base/HorizontalProgress';
export default {
  name: 'Job',
  components: { HorizontalProgress },
  props: {
    job: {
      type: [Object, Number],
      required: true
    }
  },
  computed: {
    progress () {
      const processed = this.job.progress.done || 0;
      const from = this.job.progress.from || 0;
      if (from === 0) {
        return 0;
      }
      return processed / from * 100;
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
