<template>
  <section class="list-group-section q-px-lg">
    <div class="lists-group-content">
      <div>
        <slot name="list-one"></slot>
      </div>
      <div class="relative-position">
        <slot name="list-sync-controls"></slot>
      </div>
      <div>
        <slot name="list-two"></slot>
      </div>
    </div>
    <div class="q-py-lg">
      <divider></divider>
    </div>
  </section>
</template>

<script>
import Divider from '../Base/Divider';
import ScrollMixin from '../scrollObserverMixin';

const STATUS_SYNCHRONIZED = 'synchronized';
const STATUS_WAITING = 'waiting';
const STATUS_EXIST = 'exist';
const STATUS_ERROR = 'error';

export default {
  name: 'ListsGroup',
  mixins: [ScrollMixin],
  components: { Divider },
  data: () => ({
    offset: 30,
    checkedItems: []
  }),
  computed: {},
  methods: {
    filterItems (items) {
      let filteredItems = items.filter(item =>
        this.filtersOne.status.join(' ').includes(item.status)
      );

      if (this.filtersOne.title) {
        filteredItems = filteredItems.filter(item => item.title.toLowerCase().includes(this.filtersOne.title.toLowerCase()));
      }

      return filteredItems;
    },
    sortItems (items) {
      if (items.length === 0) {
        return [];
      }
      switch (this.filtersOne.sort.toLowerCase()) {
        case 'oldest':
          return items.sort((a, b) => {
            if (a.order < b.order) {
              return 1;
            }
            if (a.order > b.order) {
              return -1;
            }
            return 0;
          });
        case 'newest':
          return items.sort((a, b) => {
            if (a.order < b.order) {
              return -1;
            }
            if (a.order > b.order) {
              return 1;
            }
            return 0;
          });
        case 'a to z':
          return items.sort((a, b) => {
            if (a.url < b.url) {
              return -1;
            }
            if (a.url > b.url) {
              return 1;
            }
            return 0;
          });
        case 'status':
          return [
            ...items.filter(item => item.status === STATUS_SYNCHRONIZED),
            ...items.filter(item => item.status === STATUS_WAITING),
            ...items.filter(item => item.status === STATUS_EXIST),
            ...items.filter(item => item.status === STATUS_ERROR)
          ];
        default:
          return items;
      }
    }
  }
};
</script>

<style scoped lang="scss">
  .list-group-section {
  }
  .lists-group-head-container {
    height: 118px;
    position: relative;
  }
  .lists-group-head {
    transition: 1s;
    display: grid;
    grid-template-columns: minmax(300px, 1fr) minmax(200px, 300px) minmax(300px, 1fr);
    grid-column-gap: 16px;
  }
  .lists-group-content {
    display: grid;
    grid-template-columns: minmax(300px, 1fr) minmax(200px, 300px) minmax(300px, 1fr);
    grid-column-gap: 16px;
  }
</style>
