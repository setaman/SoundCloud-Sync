<template>
    <div class="h-progress" :style="{height: stroke + 'px'}">
      <div class="h-progress-empty" :style="{height: stroke + 'px'}"></div>
      <div class="h-progress-indicator" :class="[stateClass]" :style="{height: stroke + 'px'}"></div>
      <div class="h-progress-full" :class="[stateClass]" :style="{height: stroke + 'px', width: progress + '%'}"></div>
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
    },
    progress: {
      type: Number,
      required: false,
      default: 0
    },
    pending: {
      type: Boolean,
      required: false,
      default: false
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    },
    done: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    stateClass () {
      if (this.error) {
        return 'error';
      }
      if (this.pending) {
        return 'pending';
      }
      if (this.done) {
        return 'done';
      }
      return 'active';
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
    transition: 0.2s;
    background-image: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  }
  .h-progress-empty {
    width: 100%;
    opacity: 0.3;
  }

  .h-progress-full {
    width: 0;
    opacity: 0.8;
    &.error, &.pending {
      opacity: 0;
    }
    &.active {
      opacity: 0.8;
    }
    &.done {
      opacity: 0;
    }
  }

  .h-progress-indicator {
    &.error {
      width: 100%;
      opacity: 0.3;
      background: red;
    }
    &.done {
      width: 100%;
      opacity: 0.6;
      background: #00ffbc;
    }
    &.active {
      animation: loading-animation 1s ease-in-out infinite;
    }
    &.pending {
      width: 100%;
      animation: loading-pending 1s ease-in-out infinite;
    }
  }

  @keyframes loading-animation {
    0% {
      width: 0;
      opacity: 0;
    }
    70% {
      width: 100%;
      opacity: 0.7;
    }
    100% {
      opacity: 0;
      width: 100%;
    }

  }

  @keyframes loading-pending {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 0;
    }
  }

</style>
