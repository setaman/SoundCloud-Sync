<template>
<div id="user-one-container" class="col-7">
  <cover url="https://i1.sndcdn.com/visuals-000000347068-Tx4Gls-original.jpg"/>
  <div class="row q-gutter-md full-height flex-center relative-position z-top">
    <div class="col-5">
      CONTETN
    </div>
    <div class="col-2">
      <user-avatar/>
    </div>
  </div>
</div>
</template>

<script>
import UserAvatar from '../UserAvatar'
import Cover from './Cover'
export default {
  name: 'UserOne',
  components: { Cover, UserAvatar }
}
</script>

<style scoped lang="scss">
  #user-one-container {
    background:  url("https://i1.sndcdn.com/visuals-000000347068-Tx4Gls-original.jpg");
    position: relative;
    overflow: hidden;
    z-index: 10;
    clip-path: polygon(0 0, 100% 0%, 73% 100%, 0% 100%);
  }

</style>
