<template>
  <div class="list-group-sync-controls text-center">
    <!--<div class="text-center">
      <h5>
        Sync your Likes
      </h5>
    </div>-->
    <div class="row">
      <div class="col">
        <q-btn round flat size="ms" color="primary" icon="fas fa-stream"/>
      </div>
      <div class="col">
        <q-btn round flat size="ms" color="primary" icon="fas fa-stream fa-flip-horizontal"/>
      </div>
    </div>
    <sync-progress :progress="progress">
      <q-btn round flat size="lg" color="primary" icon="fas fa-sync-alt"/>
    </sync-progress>
    <div class="row">
      <div class="col">
        <q-btn round flat size="ms" color="primary" icon="fas fa-angle-double-right"/>
      </div>
      <div class="col">
        <q-btn round flat size="ms" color="primary" icon="fas fa-angle-double-left"/>
      </div>
    </div>
  </div>
</template>

<script>
import SyncProgress from 'components/Base/SyncProgress';
export default {
  name: 'ListSyncControls',
  components: { SyncProgress },
  props: {
    progress: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
  .list-group-sync-controls {
    //position: fixed;
    //left: calc(50vw - 105px);
    position: relative;
    top: 30vh;
    &.fixed {
      position: fixed;
    }
  }
</style>
