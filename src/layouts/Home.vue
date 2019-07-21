<template>
  <q-layout view="hhh lpr lFf" id="home">
    <navigation/>
    <q-page-container>
      <user-statistics/>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import Navigation from 'components/Navigation/Navigation';
import UserStatistics from 'components/UsersOverview/UsersStatistics';

export default {
  name: 'Home',
  components: { UserStatistics, Navigation },
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
