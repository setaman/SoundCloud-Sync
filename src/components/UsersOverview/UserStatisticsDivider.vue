<template>
    <div class="users-statistics-divider flex flex-center">
      <div class="btn-wrapper relative-position" :style="{backgroundColor: btnWrapperColor}">
        <slot>
        </slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'UserStatisticsDivider',
  props: {
    btnWrapperColor: {
      type: String,
      required: false,
      default: '#231c45'
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
  background-color: $c_bg;
}
</style>
