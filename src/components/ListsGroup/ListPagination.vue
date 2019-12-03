<template>
    <div class="list-pagination flex flex-center q-mt-lg">
      <div>
        <q-pagination
          v-model.lazy="page"
          color="primary"
          :max="max"
          :maxPages="6"
          @click="emitPageChange"
          :boundary-numbers="true"
        >
        </q-pagination>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ListPagination',
  props: {
    current: {
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
      page: this.current || 1
    };
  },
  watch: {
    current (newVal) {
      this.page = newVal;
    }
  },
  methods: {
    emitPageChange () {
      this.$emit('pageChange', this.page);
    }
  },
  mounted () {}
};
</script>

<style scoped lang="scss">
</style>
