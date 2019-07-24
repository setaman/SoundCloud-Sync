<template>
<div id="welcome" class="fullscreen flex flex-center">
  <div class="text-center">
    <h3>
      Welcome to SoundCloudSync
    </h3>
    <div style="height: 140px">
      <q-img
        src="assets/soundcloud.svg"
        spinner-color="white"
        style="width: 240px"
      />
    </div>
    <div class="q-mt-md">
      <q-spinner-audio
        color="orange"
        size="2em"
      />
    </div>
    <p class="msg q-mt-md" :class="{blinking: blinking}">
      Doing awesome stuff for you
    </p>
  </div>
</div>
</template>

<script>
import { SOCKET_INITIALIZATION_START } from 'src/utils/socketEvents.js';
import initializationMixin from 'components/initializationMixin';
export default {
  name: 'Welcome',
  mixins: [initializationMixin],
  data: () => ({
    blinking: true
  }),
  computed: {
    userOne () {
      return this.$store.state.users.userOne;
    },
    userTwo () {
      return this.$store.state.users.userTwo;
    }
  },
  methods: {
    startInitialization () {
      if (!this.userOne.userId || !this.userTwo.userId) {
        setTimeout(() => {
          this.$router.push('settings');
        }, 1000);
        return;
      }
      this.$socket.emit(SOCKET_INITIALIZATION_START, {
        userOne: {
          userId: this.userOne.userId,
          token: this.userOne.token,
          clientId: this.userOne.clientId
        },
        userTwo: {
          userId: this.userTwo.userId,
          token: this.userTwo.token,
          clientId: this.userTwo.clientId
        }
      });
    }
  },
  mounted () {
    this.startInitialization();
  }
};
</script>

<style scoped lang="scss">
  .welcome {
    background-color: #e9f2ff;
  }

  .msg {
    transition: 0.3s;
    &.blinking {
      animation: 1s blinking ease-out infinite;
    }
  }

  @keyframes blinking {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
