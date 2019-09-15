<template>
    <div class="list-controls">
      <div class="list-controls-head">
        <div>
          <q-checkbox :disable="max===selectedCount" v-model="allSelected" @input="emitAllChecked"/>
        </div>
        <div class="list-controls-status flex items-center">
          selected <b>{{` ${selectedCount} `}}</b> from {{max}}
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
          <q-input placeholder="Filter by track title" dense outlined v-model="filters.title">
          </q-input>
        </div>
      </div>

      <div class="row list-controls-filters q-col-gutter-sm">
        <div class="col-12">
          <q-range
            :value="filters.range"
            @change="val => { filters.range = val }"
            :min="1"
            :max="max"
            :step="1"
            :disable="selected > 0"
            label
            drag-range
            color="primary"
          />
        </div>
      </div>

      <div class="row list-controls-status-filters q-col-gutter-sm">
        <div class="col-4 q-pt-none" v-for="(item, i) in statusFilters" :key="i + item">
          <input checked
                 class="status-filter"
                 :class="[item]"
                 :id="`status-filter-${item}-${_uid}`" name="status-filter-fav"
                 type="checkbox"
                 :value="item"
                 v-model="filters.status">
          <label class="ellipsis"
                 :class="[item]"
                 :for="`status-filter-${item}-${_uid}`">{{ item }}</label>
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
  data () {
    return {
      sortOptions: ['Oldest', 'Newest', 'A to Z', 'Status'],
      allSelected: true,
      statusFilters: ['waiting', 'synchronized', 'error']
    };
  },
  computed: {
    selectedCount () {
      if (this.selected > 0) {
        this.setAllSelectedFalse();
        return this.selected;
      } else if (((this.filters.range.max - this.filters.range.min) + 1) < this.max) {
        this.setAllSelectedFalse();
        return (this.filters.range.max - this.filters.range.min) + 1;
      }
      this.setAllSelectedTrue();
      return this.max;
    }
  },
  methods: {
    resetRange () {
      this.filters.range = {
        min: 1,
        max: this.max
      };
    },
    setAllSelectedFalse () {
      this.allSelected = false;
    },
    setAllSelectedTrue () {
      this.allSelected = true;
    },
    emitAllChecked () {
      this.resetRange();
      this.$emit('all-checked');
    }
  }
};
</script>

<style scoped lang="scss">
  $c_bg: #231c45;
  $c_likes: #ff4966;
  $c_followings: #2069ff;
  $c_playlists: #26ffae;

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

  input[type=checkbox].status-filter {
    opacity: 0;
    min-width: 0;
    height: 0;
    overflow: visible;
    position: static;

    & + label {
      display: inline-block;
      width: 100%;
      transition: 0.3s;
      background: transparent;
      border: 2px gray solid;
      padding: 1px 10px;
      text-align: center;
      border-radius: 2px;
      color: $c_bg;
      letter-spacing: 0.1rem;
      font-weight: bold;
      margin: 0 2px 2px 0;
      font-size: 0.8rem;
      cursor: pointer;

      &.waiting {
        border-color: #d6d6d6;
        &:hover {
          background-color: rgba(#d6d6d6, 0.2);
        }
      }

      &.synchronized {
        border-color: #7ed6ab;
        &:hover {
          background-color: rgba(#7ed6ab, 0.2);
        }
      }

      &.error {
        border-color: #ff6a87;
        &:hover {
          background-color: rgba(#ff6a87, 0.2);
        }
      }
    }

    &:checked {
      & + label {
        font-weight: bold;

        &.waiting {
          background-color: #d6d6d6;
        }

        &.synchronized {
          background-color: #7ed6ab;
        }

        &.error {
          background-color: #ff6a87;
        }
      }
    }
  }

</style>
