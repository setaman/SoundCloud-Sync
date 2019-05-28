<template>
  <div id="navigation" class="flex flex-center">
    <q-tabs dense
            no-caps
            inline-label>
      <q-route-tab
        icon="favorite"
        label="favorite"
        name="likes"
        to="/likes"
        exact
        class="text-red"
      />
      <q-route-tab
        name="followings"
        label="followings"
        icon="person"
        to="/followings"
        exact
        class="text-primary"
      />
      <q-route-tab
        name="playlist"
        label="playlist"
        icon="person"
        to="/playlists"
        exact
        class="text-cyan"
      />
    </q-tabs>
  </div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style scoped lang="scss">
  #navigation{
    position: fixed;
    z-index: 2001;
    width: 100vw;
    top: 364px;
  }

</style>
