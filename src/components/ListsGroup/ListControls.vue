<template>
    <div class="list-controls">
      <div class="list-controls-head">
        <div>
          <q-checkbox v-model="filters.all" />
        </div>
        <div class="list-controls-status flex items-center">
          selected <b>{{` ${selected} `}}</b> from {{max}}
        </div>
        <div>
          <q-btn round flat icon="save_alt" color="info"></q-btn>
        </div>
      </div>
      <div class="row list-controls-filters q-col-gutter-sm">
        <div class="col-4">
          <q-select dense outlined v-model="filters.sort" :options="sortOptions" />
        </div>
        <div class="col-8">
          <q-input dense outlined v-model="filters.title">
          </q-input>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ListControls',
  props: {
    filters: {
      type: Object,
      required: true
    },
    selected: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    sortOptions: ['Oldest', 'Newest', 'A to Z', 'Status']
  })
}
</script>

<style scoped lang="scss">
  .list-controls {
    background: white;
    border-radius: 8px;
    padding: 0 10px 10px 10px;
  }

  .list-controls-head {
    display: grid;
    grid-template-columns: 40px 1fr 40px;
  }

  .list-controls-status {
    font-size: 1rem;
    letter-spacing: 0.1rem;
    b {
      color: #2f72ff;
      display: inline-block;
      margin: 0 5px;
    }
  }

</style>
