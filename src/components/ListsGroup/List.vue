<template>
<div>
  <list-controls :filters.sync="filters" :selected="selectedItems.length" :max="items.length" @all-checked="onAllChecked"/>
  <div class="q-pt-md q-pb-sm">
    {{checkedItems}}
    {{filters}}
    <divider></divider>
  </div>
  <q-infinite-scroll @load="onLoad" :offset="200">
      <list-item v-for="item in visibleItems" :key="item.id" :item="item" :checked-items="checkedItems" @checked="onChecked" @unchecked="onUnchecked"/>
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
import ListControls from './ListControls';
import ListItem from './ListItem';
import { STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_EXIST, STATUS_ERROR } from '../../utils/const';
import Divider from '../Base/Divider';
import ListItemsTransition from '../Transitions/ListItemsTransition';

export default {
  name: 'List',
  components: { ListItemsTransition, Divider, ListItem, ListControls },
  props: {
    items: {
      type: Array,
      required: true
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
        console.log('FIILTER CHANGES');
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
    },
    visibleItems () {
      return this.items.slice(0, this.offset);
    }
  },
  methods: {
    emitSelectedItems () {
      this.$emit('selectedChange', this.selectedItems);
    },
    emitFilterChanges () {
      this.$emit('filterChange', this.filters);
    },
    onLoad (index, done) {
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
