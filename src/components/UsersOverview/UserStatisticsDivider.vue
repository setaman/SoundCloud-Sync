<template>
    <div class="users-statistics-divider flex flex-center">
      <div class="progress-container absolute" :style="{backgroundColor: btnWrapperColor}">
        <sync-progress :progress="syncProgress || 0" :size="80" :legend="false"></sync-progress>
      </div>
      <div slot="caption" class="btn-wrapper relative-position">
        <slot>
        </slot>
      </div>
    </div>
</template>

<script>
import SyncProgress from '../Base/SyncProgress';
export default {
  name: 'UserStatisticsDivider',
  components: { SyncProgress },
  props: {
    btnWrapperColor: {
      type: String,
      required: false,
      default: '#231c45'
    },
    syncProgress: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
  $c_bg: #231c45;

.users-statistics-divider {
  position: relative;
  height: 100%;
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 2px;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 2px;
    background-image: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    opacity: 0.5;
  }
}
.btn-wrapper {
  display: inline-block;
  border-radius: 50%;
}
.progress-container {
  height: 100px;
  border-radius: 50%;
  padding: 10px;
  //position: relative;
}
</style>
