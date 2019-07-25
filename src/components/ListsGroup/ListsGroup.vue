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

export default {
  name: 'ListsGroup',
  mixins: [ScrollMixin],
  components: { Divider },
  data: () => ({
    offset: 30,
    checkedItems: []
  }),
  computed: {},
  methods: {}
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
    grid-template-columns: minmax(280px, 1fr) minmax(260px, 300px) minmax(280px, 1fr);
    grid-column-gap: 16px;
  }
  .lists-group-content {
    display: grid;
    grid-template-columns: minmax(280px, 1fr) minmax(260px, 300px) minmax(280px, 1fr);
    grid-column-gap: 16px;
  }
</style>
