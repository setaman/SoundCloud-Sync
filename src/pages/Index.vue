<template>
  <q-page>
    <q-page-sticky expand position="top">
      <div class="flex flex-center">
        <q-tabs  dense
                 no-caps
                 inline-label>
          <q-route-tab
            icon="favorite"
            label="favorite"
            name="likes"
            to="/"
            exact
            class="text-red"
          />
          <q-route-tab
            name="followings"
            label="followings"
            icon="person"
            to="/"
            exact
            class="text-primary"
          />
          <q-route-tab
            name="playlist"
            label="playlist"
            icon="person"
            to="/"
            exact
            class="text-cyan"
          />
        </q-tabs>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
<style lang="scss" scoped>
  h1 {
    background: red;
  }
</style>
