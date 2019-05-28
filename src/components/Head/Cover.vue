<template>
    <div class="user-cover" :style="position">
      <q-img
        :src="url"
        spinner-color="white"
        style="height: 400px; max-width: 100%; min-width: 60vw"
      />
    </div>
</template>

<script>
export default {
  name: 'Cover',
  props: {
    right: {
      type: Boolean,
      required: false,
      default: false
    },
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    position () {
      return this.right ? { right: 0 } : ''
    }
  }
}
</script>

<style scoped lang="scss">
  .user-cover {
    height: 100%;
    width: 100%;
    min-width: 60vw;
    //background: url("https://i1.sndcdn.com/visuals-000000347068-Tx4Gls-original.jpg");
    background-size: cover;
    position: absolute;
    filter: grayscale(0) brightness(0.5) blur(5px);
    top: 0;
  }

</style>
