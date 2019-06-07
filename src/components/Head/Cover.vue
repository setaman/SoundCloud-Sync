<template>
  <div class="cover-container">
    <div class="user-one-cover cover-image" :style="bgImageOne">
      <q-img
        v-if="urlOne"
        :src="urlOne"
        spinner-color="white"
        style="height: 400px; max-width: 100%; min-width: 60vw"
      />
    </div>
    <div class="user-two-cover cover-image" :style="bgImageTwo">
      <q-img
        v-if="urlTwo"
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
      required: false
    },
    urlTwo: {
      type: String,
      required: false
    },
    bgImageOne: {
      type: String,
      required: false
    },
    bgImageTwo: {
      type: String,
      required: false
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
    filter: brightness(0.7) blur(0px);
  }

  .user-two-cover {
    right: 0;
    width: 65vw;
    filter: brightness(0.7) blur(2px);

  }

</style>
