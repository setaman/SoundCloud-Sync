<template>
  <div id="navigation" class="row q-col-gutter-lg-md">
    <div class="col">
      <q-tabs dense
              no-caps
              inline-label>
        <q-route-tab
          icon="favorite"
          label="favorite"
          name="likes"
          to="/home/likes"
          exact
          class="text-red"
        />
        <q-route-tab
          name="followings"
          label="followings"
          icon="person"
          to="/home/followings"
          exact
          class="text-primary"
        />
        <q-route-tab
          name="playlist"
          label="playlist"
          icon="person"
          to="/home/playlists"
          exact
          class="text-cyan"
        />
        <q-route-tab
          name="settings"
          label="settings"
          icon="settings"
          to="/settings"
          exact
          class="text-cyan"
        />
        <q-route-tab
          name="welcome"
          label="welcome"
          icon="home"
          to="/"
          exact
          class="text-red-10"
        />
      </q-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style scoped lang="scss">
  #navigation{
    position: relative;
    background: white;
    //z-index: 2001;
    width: 100vw;
    border-radius: 0 0 50px 50px;
    top: -50px;
    padding: 70px 30px 0px 30px;
  }

</style>
