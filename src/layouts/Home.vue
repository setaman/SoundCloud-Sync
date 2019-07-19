<template>
  <q-layout view="hhh lpr lFf">
    <!--<q-header id="head">
      <head-container/>
    </q-header>-->
    <q-page-container id="home">

      <navigation/>

      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import HeadContainer from 'components/Head/HeadContainer';
import Navigation from 'components/Navigation/Navigation';

export default {
  name: 'Home',
  components: { Navigation, HeadContainer },
  data: () => ({}),
  methods: {}
};
</script>

<style lang="scss" scoped>
  #head {
    background: white !important;
    border-radius: 0 0 50px 50px;
    border: 5px #241d46 solid;
    border-top: none;
    overflow: hidden;
  }
  #home {
    display: grid;
    grid-template-columns: minmax(80px, max-content) 1fr;
  }
</style>
