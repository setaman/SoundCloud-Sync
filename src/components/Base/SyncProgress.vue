<template>
  <vue-ellipse-progress
    :progress="progress"
    :size="size"
    font-size="1.5rem"
    :legend="legend"
    :color="options.color"
    :thickness="3"
    emptyColor="transparent"
    :emptyColorFill="options.emptyColorFill"
    fontColor="white"
    legendClass="sync-progress-legend"
    :animation="{type: 'rs', delay: 1000, duration: 700}">
    <span slot="legend-value">
      <slot name="legend-value"></slot>
    </span>
    <div slot="legend-caption">
      <slot name="caption">

      </slot>
    </div>
  </vue-ellipse-progress>
</template>

<script>
const waveColor = '#004aef';
export default {
  name: 'SyncProgress',
  props: {
    progress: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 250
    },
    legend: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data: () => ({
    options: {
      color: {
        gradient: {
          radial: false,
          colors: [
            {
              color: '#b224ef',
              offset: '0',
              opacity: '0.6'
            },
            {
              color: '#7579ff',
              offset: '100',
              opacity: '0.6'
            }
          ]
        }
      },
      emptyColorFill: {
        gradient: {
          radial: true,
          direction: '',
          colors: [
            {
              color: waveColor,
              offset: '50',
              opacity: '0.3'
            },
            {
              color: waveColor,
              offset: '50',
              opacity: '0.2'
            },
            {
              color: waveColor,
              offset: '75',
              opacity: '0.1'
            },
            {
              color: waveColor,
              offset: '75',
              opacity: '0.06'
            },
            {
              color: waveColor,
              offset: '100',
              opacity: '0.03'
            }
          ]
        }
      }
    }
  })
};
</script>

<style lang="scss">
  $c_bg: #231c45;
  .sync-progress-legend {
    font-family: Montserrat;
  }
</style>
