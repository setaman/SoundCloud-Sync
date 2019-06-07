<template>
    <div class="user-avatar-container">
      <q-avatar :size="size">
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
    },
    size: {
      type: String,
      required: false,
      default: '100px'
    }
  }
}
</script>

<style scoped>
</style>
