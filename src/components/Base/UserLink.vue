<template>
  <p class="ellipsis text-white text-bold">
    <a class="user-link" @click="open">
      {{ username.slice(0, 60) }}
    </a>
  </p>
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'UserLink',
  props: {
    url: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  methods: {
    open () {
      openURL(this.url);
    }
  }
};
</script>

<style scoped lang="scss">
.user-link {
  transition: 0.3s;
  color: white;
  text-decoration: none;
  cursor: pointer;
  &:hover{
    color: #8344ff;
  }
}
</style>
