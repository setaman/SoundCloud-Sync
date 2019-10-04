<template>
  <q-layout view="hhh lpr lFf" id="home">
    <navigation/>
    <q-page-container>
      <users-overview/>
      <router-view/>
    </q-page-container>
    <tasks-overview-control/>
  </q-layout>
</template>

<script>
import Navigation from 'components/Navigation/Navigation';
import UsersOverview from 'components/UsersOverview/UsersOverview';
import TasksOverviewControl from 'components/Tasks/TasksOverview/TasksOverviewControl';

export default {
  name: 'Home',
  components: { TasksOverviewControl, UsersOverview, Navigation },
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
