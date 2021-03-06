<template>
<div class="list">
  <list-controls :filters.sync="filters" :selected="checkedItems.length" :max="maxItems" @all-checked="onAllChecked"/>
  <div class="q-pt-sm q-pb-sm">
    <div class="relative-position">
      <divider></divider>
      <transition
        apper
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div style="height: 2px; top: 0;" v-if="isLoading" class="absolute full-width">
          <horizontal-progress :stroke="2" class="absolute"/>
        </div>
      </transition>
    </div>
  </div>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div v-if="items.length < 1" class="text-center">
      <empty-animation>
        <p>
          Nothing found here. Try to adjust filters
        </p>
      </empty-animation>
    </div>
  </transition>
  <transition-group name="list-item" tag="div">
    <list-item
      v-for="(item, i) in items"
      :key="`${i}_${item.id}`"
      :item="item"
      :checked-items="checkedItems"
      @checked="onChecked"
      @unchecked="onUnchecked"/>
  </transition-group>
  <!-- Pagination goes here -->
  <slot>

  </slot>
  <div v-if="items.length > 0" class="list-stop q-pt-lg q-pb-xl">
    <divider></divider>
  </div>
</div>
</template>

<script>
import ListControls from 'components/ListsGroup/ListControls';
import ListItem from 'components/ListsGroup/ListItem';
import { STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_ERROR } from 'src/utils/const';
import Divider from 'components/Base/Divider';
import HorizontalProgress from 'components/Base/HorizontalProgress';
import EmptyAnimation from 'components/Base/EmptyAnimation';

export default {
  name: 'List',
  components: { EmptyAnimation, HorizontalProgress, Divider, ListItem, ListControls },
  props: {
    items: {
      type: Array,
      required: true
    },
    maxItems: {
      type: [Number, String],
      required: true
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      filters: {
        title: '',
        status: [STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_ERROR],
        sort: 'Newest',
        range: {
          min: 1,
          max: this.maxItems
        }
      },
      offset: 30,
      checkedItems: []
    };
  },
  watch: {
    filters: {
      handler () {
        this.emitFilterChanges();
      },
      deep: true
    },
    maxItems () {
      this.filters.range.max = this.maxItems;
    },
    items () {
      this.checkedItems = [];
      this.emitSelectedItems();
    }
  },
  computed: {
    selectedItems () {
      return this.checkedItems.length > 0 ? this.checkedItems : this.items;
    }
  },
  methods: {
    emitSelectedItems () {
      this.$emit('selectedChange', this.checkedItems);
    },
    emitFilterChanges () {
      this.$emit('filtersChange', this.filters);
    },
    onChecked (itemId) {
      this.checkedItems.push(itemId);
      this.emitSelectedItems();
    },
    onUnchecked (itemId) {
      const index = this.checkedItems.findIndex(id => id === itemId);
      this.checkedItems.splice(index, 1);
      this.emitSelectedItems();
    },
    onAllChecked () {
      this.checkedItems = [];
    }
  }
};
</script>

<style scoped lang="scss">
  .list {
    position: relative;
  }
.list-stop {
  padding-bottom: 60px;
}
  .list-item-enter, .list-item-leave-to {
    opacity: 0;
    transform: translateX(10px);
  }
  .list-item-leave-active {
    // position: absolute;
  }
</style>
