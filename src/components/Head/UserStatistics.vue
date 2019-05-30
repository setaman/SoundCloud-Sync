<template>
  <div class="col-xs-12 col-sm-12 col-md-10">
    <div class="row wrap q-gutter-md">
      <div class="col">
        <div class="flex flex-center">
          <q-icon name="favorite" class="text-red-5" style="font-size: 2em;"></q-icon>
        </div>
        <div class="stat-value flex flex-center text-uppercase">
          481
        </div>
        <div class="stat-title flex flex-center text-uppercase">
          likes
        </div>
      </div>
      <div class="col">
        <div class="flex flex-center">
          <q-icon name="person" class="text-blue-7" style="font-size: 2em;"></q-icon>
        </div>
        <div class="stat-value flex flex-center text-uppercase">
          34
        </div>
        <div class="stat-title flex flex-center text-uppercase">
          followings
        </div>
      </div>
      <div class="col">
        <div class="flex flex-center">
          <q-icon name="list" class="text-cyan-7" style="font-size: 2em;"></q-icon>
        </div>
        <div class="stat-value flex flex-center text-uppercase">
          23
        </div>
        <div class="stat-title flex flex-center text-uppercase">
          playlists
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserStatistics'
}
</script>

<style scoped lang="scss">
  .stat-title {
    font-family: "Quicksand Medium", serif;
    letter-spacing: 0.1rem;
  }

  .stat-value {
    font-family: "Quicksand Light", serif;
    font-size: 3rem;
  }

</style>
