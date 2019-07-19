<template>
  <div class="list-group-sync-controls text-center">
    <div class="text-center">
      <h5>
        Sync your Likes
      </h5>
    </div>
    <div class="row">
      <div class="col">
        <q-btn round flat size="ms" color="primary" icon="sync" slot="legend-capture"/>
      </div>
      <div class="col">
        <q-btn round flat size="ms" color="primary" icon="sync" slot="legend-capture"/>
      </div>
    </div>
    <vue-ellipse-progress :progress="55" font-size="2rem" :animation="{type: 'rs', delay: 1000, duration: 700}">
      <span slot="legend-value">%</span>
      <q-btn round flat size="lg" color="primary" icon="sync" slot="legend-capture"/>
    </vue-ellipse-progress>
    <div class="row">
      <div class="col">
        <q-btn round flat size="ms" color="primary" icon="sync" slot="legend-capture"/>
      </div>
      <div class="col">
        <q-btn round flat size="md" color="primary" icon="sync" slot="legend-capture"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListSyncControls'
};
</script>

<style scoped lang="scss">
  .list-group-sync-controls {
    position: fixed;
    left: calc(50vw - 105px);
    &.fixed {
      position: fixed;
    }
  }
</style>
