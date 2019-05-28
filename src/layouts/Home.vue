<template>
  <q-layout view="hHh Lpr lFf">
    <q-header id="head">
      <q-toolbar inset color="#3a588d" class="wrap text-primary bg-transparent q-gutter-md">
          <head-container/>
      </q-toolbar>
    </q-header>
    <navigation/>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import HeadContainer from 'components/Head/HeadContainer'
import Navigation from 'components/Navigation'
export default {
  name: 'Home',
  components: { Navigation, HeadContainer },
  data: () => ({}),
  methods: {}
}
</script>

<style lang="scss" scoped>
  #head {
    background: #3a588d !important;
    border-radius: 0 0 50px 50px;
  }
</style>
