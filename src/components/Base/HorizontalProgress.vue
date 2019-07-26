<template>
    <div class="h-progress" :style="{height: stroke + 'px'}">
      <div class="h-progress-empty" :style="{height: stroke + 'px'}"></div>
      <div class="h-progress-full" :style="{height: stroke + 'px'}"></div>
      <div class="h-progress-indicator" :style="{height: stroke + 'px'}"></div>
    </div>
</template>

<script>
export default {
  name: 'HorizontalProgress',
  props: {
    stroke: {
      type: Number,
      required: false,
      default: 4
    }
  }
};
</script>

<style scoped lang="scss">
  .h-progress {
    position: relative;
    width: 100%;
    height: 4px;
    border-radius: 10px;
  }
  .h-progress-full, .h-progress-empty, .h-progress-indicator {
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  }
  .h-progress-empty {
    width: 100%;
    opacity: 0.3;
  }

  .h-progress-full {
    width: 0%;
    opacity: 0.8;
  }

  .h-progress-indicator {
    animation: loading-animation 1s ease-in-out infinite;
  }

  @keyframes loading-animation {
    0% {
      width: 0%;
      opacity: 0;
    }
    70% {
      width: 100%;
      opacity: 0.4;
    }
    100% {
      opacity: 0;
      width: 100%;
    }

  }

</style>
