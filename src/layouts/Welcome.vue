<template>
<div id="welcome" class="fullscreen flex flex-center">
  <div class="text-center">
    <h3 class="q-mb-none">
      Welcome to SoundCloudSync
    </h3>
    <div>
      <lottie :options="options"/>
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
import Lottie from 'components/Base/Lottie';
import animation from 'src/lottie-animations/sc.json';

export default {
  name: 'Welcome',
  components: { Lottie },
  mixins: [initializationMixin],
  data: () => ({
    blinking: true,
    options: {
      animationData: animation,
      height: 200,
      width: 400
    }
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
      this.$socket.client.emit(SOCKET_INITIALIZATION_START, {
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
    },
    onDataLoaded () {},
    onInitialisationSuccess () {
      this.blinking = false;
      setTimeout(() => {
        this.$router.push('home');
      }, 1500);
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
