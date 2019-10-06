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
  </section>
</template>

<script>
import scrollObserverMixin from 'components/scrollObserverMixin';

export default {
  name: 'ListsGroup',
  mixins: [scrollObserverMixin],
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
    display: grid;
    grid-template-columns: minmax(280px, 1fr)300px minmax(280px, 1fr);
    grid-column-gap: 16px;
  }
</style>
