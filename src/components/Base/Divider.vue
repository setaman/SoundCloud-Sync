<template>
    <div class="custom-divider"></div>
</template>

<script>
export default {
  name: 'Divider'
}
</script>

<style scoped lang="scss">
  .custom-divider {
    height: 2px;
    border-radius: 2px;
    width: 100%;
    opacity: 0.1;
    background-image: linear-gradient(to top, #b224ef 0%, #7579ff 100%);
  }
</style>
