<template>
<q-page>
  <div class="row fullscreen">
    <div class="col flex flex-center">
      <settings-form/>
    </div>
  </div>
</q-page>
</template>

<script>
import SettingsForm from '../components/Settings/SettingsForm'
export default {
  name: 'SettingsPage',
  components: { SettingsForm }
}
</script>

<style scoped lang="scss">
</style>
