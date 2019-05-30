<template>
  <div class="cover-container">
    <div class="user-one-cover cover-image">
      <q-img
        :src="urlOne"
        spinner-color="white"
        style="height: 400px; max-width: 100%; min-width: 60vw"
      />
    </div>
    <div class="user-two-cover cover-image">
      <q-img
        :src="urlTwo"
        spinner-color="white"
        style="height: 400px; max-width: 100%; min-width: 60vw"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cover',
  props: {
    urlOne: {
      type: String,
      required: true
    },
    urlTwo: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  .cover-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .cover-image {
    position: absolute;
    top: 0;
    filter: grayscale(0) brightness(0.5) blur(5px);
    width: 57vw;
    height: 100%;
  }

  .user-one-cover {
    left: 0;
    clip-path: polygon(0 0, 100% 0%, 73% 100%, 0% 100%);
    z-index: 2;
  }

  .user-two-cover {
    right: 0;
    width: 65vw;
  }

</style>
