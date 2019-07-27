<template>
  <section class="list-group-section q-px-lg">
    <div class="lists-group-content">
      <div>
        <slot name="list-one"></slot>
        <div class="q-py-lg">
          <divider></divider>
        </div>
      </div>
      <div class="relative-position">
        <slot name="list-sync-controls"></slot>
      </div>
      <div>
        <slot name="list-two"></slot>
        <div class="q-py-lg">
          <divider></divider>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Divider from 'components/Base/Divider';
import ScrollMixin from 'components/scrollObserverMixin';

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
  .lists-group-content {
    min-height: calc(100vh - 100px);
    display: grid;
    grid-template-columns: minmax(280px, 1fr)300px minmax(280px, 1fr);
    grid-template-rows: minmax(calc(100vh - 100px), 1fr);
    grid-column-gap: 16px;
  }
</style>
