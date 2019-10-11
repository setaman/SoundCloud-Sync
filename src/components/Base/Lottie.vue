<template>
  <div id="anim" :style="{ width: `${options.width || 100}px`, height: `${options.height || 100}px`}" ref="animContainer"></div>
</template>

<script>
import lottie from 'lottie-web';

export default {
  name: 'Lottie',
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    anim: ''
  }),
  mounted () {
    this.anim = lottie.loadAnimation({
      container: this.$refs.animContainer,
      renderer: 'svg',
      loop: this.options.loop !== undefined ? this.options.loop : true,
      autoplay: true,
      animationData: this.options.animationData
    });
    this.anim.setSpeed(this.options.speed || 1);
  }

};
</script>

<style scoped lang="scss">
#anim {
  display: inline-block;
}

</style>
