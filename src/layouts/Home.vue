<template>
  <q-layout view="hhh Lpr lFf">
    <q-header id="head" reveal>
          <head-container/>
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
    background: #187dff !important;
    border-radius: 0 0 50px 50px;
    overflow: hidden;
  }
</style>
