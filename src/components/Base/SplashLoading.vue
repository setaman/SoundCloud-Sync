<template>
    <div class="splash-loading flex flex-center full-height full-width">
      <div class="text-center">
        <lottie :options="animationOptions"/>
      </div>
    </div>
</template>

<script>
import animation from 'src/lottie-animations/sc.json';
import Lottie from 'components/Base/Lottie';
export default {
  name: 'SplashLoading',
  components: { Lottie },
  computed: {
    animationOptions () {
      return {
        speed: 0.5,
        animationData: animation,
        width: 150,
        height: 150
      };
    }
  }
};
</script>

<style scoped lang="scss">
  .splash-loading {
    min-height: 90vh;
  }

</style>
