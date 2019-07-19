<template>
  <q-layout view="hhh Lpr lFf">
    <q-header id="head">
      <head-container/>
    </q-header>
    <q-page-container>

      <navigation/>

      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import HeadContainer from 'components/Head/HeadContainer';
import Navigation from 'components/Navigation';

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
</style>
