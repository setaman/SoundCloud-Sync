<template>
  <div class="list-group-sync-controls-container relative-position text-center" :class="{expanded: isOverviewExpanded}">
    <div class="row list-group-sync-controls">
      <div class="col">
        <q-btn round flat size="ms" color="primary" icon="fas fa-stream" @click="emitSyncSelectedOne"/>
      </div>
      <div class="col">
        <q-btn round flat size="ms" color="primary" icon="fas fa-stream fa-flip-horizontal" @click="emitSyncFilteredOne"/>
      </div>
    </div>
    <sync-progress :progress="progress">
      <q-btn slot="legend-caption" round flat size="lg" color="primary" icon="fas fa-sync-alt"/>
    </sync-progress>
    <div class="row">
      <div class="col">
        <q-btn round flat size="ms" color="primary" icon="fas fa-angle-double-right" @click="emitSyncSelectedTwo"/>
      </div>
      <div class="col">
        <q-btn round flat size="ms" color="primary" icon="fas fa-angle-double-left" @click="emitSyncFilteredTwo"/>
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
  },
  computed: {
    isOverviewExpanded () {
      return this.$store.state.overview.expanded;
    }
  },
  methods: {
    emitSyncSelectedOne () {
      this.$emit('syncSelectedOne');
    },
    emitSyncFilteredOne () {
      this.$emit('syncFilteredOne');
    },
    emitSyncSelectedTwo () {
      this.$emit('syncSelectedTwo');
    },
    emitSyncFilteredTwo () {
      this.$emit('syncFilteredTwo');
    }
  }
};
</script>

<style scoped lang="scss">
  .list-group-sync-controls-container {
    position: fixed;
    width: 300px;
    //left: calc(50vw - 105px);
    // position: relative;
    top: 30vh;
    transition: 0.5s;
    &.expanded {
      top: 50vh;
    }
  }
</style>
