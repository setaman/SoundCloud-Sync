<template>
    <div class="user-avatar-container">
      <q-avatar size="100px">
        <img :src="url">
      </q-avatar>
    </div>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    url: {
      type: String
    }
  }
}
</script>

<style scoped>
</style>
