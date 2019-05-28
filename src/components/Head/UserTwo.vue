<template>
  <div id="user-two-container" class="col-5">
    <cover right url="https://i1.sndcdn.com/visuals-000007875030-JsvTZv-original.jpg"/>
    <div class="row q-gutter-md full-height flex-center relative-position z-top">
      <div class="col-5">
        <user-avatar/>
      </div>
      <div class="col-2">
        CONTETN
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from '../UserAvatar'
import Cover from './Cover'
export default {
  name: 'UserTwo',
  components: { Cover, UserAvatar }
}
</script>

<style scoped lang="scss">
  #user-two-container {
   position: relative;
  }
</style>
