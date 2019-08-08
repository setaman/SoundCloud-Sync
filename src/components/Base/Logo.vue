<template>
  <canvas class="logo" width="240" height="240"></canvas>
</template>

<script>
import { ZIllustration, ZRect, ZHemisphere, ZShape } from 'vue-zdog';
import Zdog from 'zdog';

export default {
  components: { ZIllustration, ZRect, ZHemisphere, ZShape },
  name: 'Logo',
  mounted () {
    let illo = new Zdog.Illustration({
      // set canvas with selector
      element: '.logo'
    });

    let dome = new Zdog.Hemisphere({
      addTo: illo,
      diameter: 120,
      // fill enabled by default
      // disable stroke for crisp edge
      stroke: false,
      color: '#C25',
      backface: '#EA0'
    });

    let hui = new Zdog.Shape({
      addTo: illo,
      path: [
        { x: 0, y: -40 },
        { x: 40, y: 40 },
        { x: -40, y: 40 }
      ],
      closed: false, // unclosed
      stroke: 20,
      color: '#636'
    });
  }
};
</script>

<style scoped>

</style>
