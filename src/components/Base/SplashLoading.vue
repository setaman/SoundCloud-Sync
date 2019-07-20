<template>
    <div class="splash-loading flex flex-center full-height full-width">
      <div class="text-center">
        <q-img
          src="assets/soundcloud.svg"
          spinner-color="white"
          style="width: 240px"/>
        <div class="q-mt-md">
          <q-spinner-audio
            color="orange"
            size="2em"
          />
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SplashLoading'
};
</script>

<style scoped lang="scss">
  .splash-loading {
    min-height: 90vh;
  }

</style>
