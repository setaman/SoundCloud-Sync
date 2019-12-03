<template>
  <div class="empty-anim-container">
    <lottie class="empty-anim q-mt-xl" :class="{ dark: dark }" :options="options"/>
    <slot></slot>
  </div>
</template>

<script>
import Lottie from 'components/Base/Lottie';
import animation from 'src/lottie-animations/empty.json';

export default {
  name: 'EmptyAnimation',
  components: { Lottie },
  props: {
    dark: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      options: {
        animationData: animation,
        width: 400,
        height: 200,
        loop: true
      }
    };
  }
};
</script>

<style lang="scss">
.empty-anim-container {
position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}
  .empty-anim {
  g g:nth-child(6) {
    g path {
      opacity: 0.5;
    }
  }
  g g:nth-child(5) {
    g path {
      opacity: 0.5;
    }
  }
  &.dark {
    g g:nth-child(6) {
      g path {
        opacity: 0.05;
      }
    }
    g g:nth-child(5) {
      g path {
        opacity: 0.1;
      }
    }
  }
}
</style>
