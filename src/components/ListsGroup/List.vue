<template>
<div>
  <list-controls :filters.sync="filters" :selected="checkedItems.length || maxItems" :max="maxItems" @all-checked="onAllChecked"/>
  <div class="q-pt-md q-pb-sm">
    <!--{{checkedItems}}
    {{filters}}-->
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
  <q-infinite-scroll @load="onLoad" :offset="200">
      <list-item v-for="item in items" :key="item.id" :item="item" :checked-items="checkedItems" @checked="onChecked" @unchecked="onUnchecked"/>
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-audio
          color="orange"
          size="2em"
        />
      </div>
    </template>
  </q-infinite-scroll>
</div>
</template>

<script>
import ListControls from 'components/ListsGroup/ListControls';
import ListItem from 'components/ListsGroup/ListItem';
import { STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_EXIST, STATUS_ERROR } from 'src/utils/const';
import Divider from 'components/Base/Divider';
import ListItemsTransition from 'components/Transitions/ListItemsTransition';
import HorizontalProgress from 'components/Base/HorizontalProgress';

export default {
  name: 'List',
  components: { HorizontalProgress, ListItemsTransition, Divider, ListItem, ListControls },
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
  data: () => ({
    filters: {
      title: '',
      status: [STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_EXIST, STATUS_ERROR],
      sort: 'Oldest'
    },
    offset: 30,
    checkedItems: []
  }),
  watch: {
    filters: {
      handler () {
        this.emitFilterChanges();
      },
      deep: true
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
      this.$emit('selectedChange', this.selectedItems);
    },
    emitFilterChanges () {
      this.$emit('filtersChange', this.filters);
    },
    onLoad (index, done) {
      this.$emit('increasePage');
      console.log('LOAD');
      if (this.offset < this.items.length) {
        this.offset = this.offset * 2;
        console.log('LOAD', this.offset);
      }
      done();
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

<style scoped>

</style>
