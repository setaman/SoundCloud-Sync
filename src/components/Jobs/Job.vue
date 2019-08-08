<template>
  <div class="job">
    <div class="flex flex-center">
      <p class="q-ma-none">
        status
      </p>
    </div>
    <div class="flex flex-center">
      <horizontal-progress/>
    </div>
    <div class="flex flex-center">
      <q-btn round icon="close" flat color="red"></q-btn>
    </div>
  </div>
</template>

<script>
import HorizontalProgress from 'components/Base/HorizontalProgress';
export default {
  name: 'Job',
  components: { HorizontalProgress },
  props: {
    job: {
      type: [Object, Number],
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.job{
  display: grid;
  height: 60px;
  width: 100%;
  grid-template-columns: 60px 1fr 60px;
  grid-column-gap: 10px;
}
</style>
