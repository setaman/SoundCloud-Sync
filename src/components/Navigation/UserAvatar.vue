<template>
    <div class="user-avatar-container" :style="containerStyle">
      <q-avatar v-if="url && !isDefaultImg" :size="size + 'px'">
        <img :src="url">
      </q-avatar>
    </div>
</template>

<script>
import randomGradient from 'components/randomGradient';
export default {
  name: 'UserAvatar',
  props: {
    url: {
      required: false
    },
    size: {
      type: String,
      required: false,
      default: '100'
    }
  },
  computed: {
    containerStyle () {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        borderRadius: `${this.size / 2}px`,
        backgroundImage: this.url && !this.isDefaultImg ? '' : randomGradient()
      };
    },
    borderRadiusStyle () {
      return `border-radius:${this.size / 2}px`;
    },
    backgroundStyle () {
      return this.url && !this.isDefaultImg ? '' : randomGradient();
    },
    isDefaultImg () {
      return this.url.toLowerCase().includes('default');
    }
  }
};
</script>

<style scoped lang="scss">
  .user-avatar-container {
    display: inline-block;
  }
</style>
