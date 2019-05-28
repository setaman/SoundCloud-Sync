<template>
  <q-layout view="hHh Lpr lFf">
    <q-header reveal elevated>
      <q-toolbar inset class="wrap text-primary bg-white q-gutter-md">
          <div class="col-6">
            <q-card class="my-card bg-secondary text-white">
              <q-card-section>
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
              </q-card-section>

              <q-card-section>
                Hui
              </q-card-section>

              <q-separator dark />

              <q-card-actions>
                <q-btn flat>Action 1</q-btn>
                <q-btn flat>Action 2</q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-6">
            <q-card class="my-card bg-secondary text-white">
              <q-card-section>
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
              </q-card-section>

              <q-card-section>
                Hui
              </q-card-section>

              <q-separator dark />

              <q-card-actions>
                <q-btn flat>Action 1</q-btn>
                <q-btn flat>Action 2</q-btn>
              </q-card-actions>
            </q-card>
          </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'Home',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
