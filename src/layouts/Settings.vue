<template>
  <q-layout view="hhh Lpr lFf">
    <q-page-container>
      <settings-page/>
    </q-page-container>
  </q-layout>
</template>

<script>
import SettingsPage from '../pages/SettingsPage';
export default {
  name: 'Settings',
  components: { SettingsPage },
  data: () => ({})
};
</script>

<style lang="scss" scoped>
</style>
