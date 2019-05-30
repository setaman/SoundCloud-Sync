<template>
  <div id="head-container" class="row wrap">
    <div class="cover">
      <cover url-one="https://i1.sndcdn.com/visuals-000000347068-Tx4Gls-original.jpg"
             url-two="https://i1.sndcdn.com/visuals-000007875030-JsvTZv-original.jpg"/>
    </div>
    <user-one/>
    <user-two/>
  </div>
</template>

<script>
import UserOne from './UserOne'
import UserTwo from './UserTwo'
import Cover from './Cover'
export default {
  name: 'HeadContainer',
  components: { Cover, UserTwo, UserOne }
}
</script>

<style scoped lang="scss">
  #head-container{
    height: 400px;
    width: 100%;
    position: relative;
    .cover {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

</style>
