<template>
<div id="user-one-container" class="col-6">
  <div class="row justify-center items-center full-height q-col-gutter-sm relative-position z-top q-pa-xl">
    <div class="col-xs-12 col-sm-12 col-md-10">
      <div class="row wrap q-gutter-md">
        <user-statistics/>
      </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-2 flex flex-center">
      <user-avatar/>
    </div>
  </div>
</div>
</template>

<script>
import UserAvatar from '../UserAvatar'
import UserStatistics from './UserStatistics'
export default {
  name: 'UserOne',
  components: { UserStatistics, UserAvatar }
}
</script>

<style scoped lang="scss">
  #user-one-container {
    position: relative;
    overflow: hidden;
    z-index: 10;
  }

</style>
