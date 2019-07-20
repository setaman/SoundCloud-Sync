<template>
    <div class="users-statistics-divider">
    </div>
</template>

<script>
export default {
  name: 'UserStatisticsDivider'
};
</script>

<style scoped lang="scss">
.users-statistics-divider {
  display: inline-block;
  height: 100%;
  background-image: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  opacity: 0.5;
  //background-color: rgba(255, 255, 255, 0.3);
  width: 2px;
  border-radius: 2px;
  min-height: 20px;
  margin: 0 15px;
}
</style>
