<template>
  <div id="head-container" class="row">
    <user-one/>
    <user-two/>
  </div>
</template>

<script>
import UserOne from './UserOne'
import UserTwo from './UserTwo'
export default {
  name: 'HeadContainer',
  components: { UserTwo, UserOne }
}
</script>

<style scoped lang="scss">
  #head-container{
    height: 400px;
    width: 100%;
  }

</style>
