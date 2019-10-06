<template>
  <div id="q-app">
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-if="serverError" id="server-connection-error-banner" class="full-width full-height text-center">
        <div id="server-connection-error-banner-content" class="full-width q-pa-md">
          <p class="q-ma-none">
            Oh no, an error occurred in the internal process of the app. Try to restart the app. If this does not help,
            let me now what is happened!
          </p>
          <p class="q-ma-none">
            Error: {{serverError}}
          </p>
        </div>
      </div>
    </transition>
    <views-transition>
      <router-view></router-view>
    </views-transition>
  </div>
</template>

<script>
import notificationMixin from 'components/notificationMixin';
import ViewsTransition from 'components/ViewsTransition';

export default {
  name: 'App',
  components: { ViewsTransition },
  mixins: [notificationMixin],
  data: () => ({
    serverError: ''
  }),
  sockets: {
    connect () {
      console.warn('SOCKET CONNECTED');
      this.serverError = '';
    },
    disconnect () {
      console.log('SOCKET DISCONNECTED');
      this.serverError = 'Disconnected from WS';
      this.notifyError('Error in internal process, restart the app or try again later');
    },
    error () {
      console.log('SOCKET CONNECTION ERROR');
      this.serverError = 'WS connection error';
      this.notifyError('Error in internal process, restart the app or try again later');
    }
  }
};
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Quicksand:300,400,700&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700&display=swap');

  $c_bg: #231c45;
  $c_likes: #ff4966;
  $c_followings: #2069ff;
  $c_playlists: #26ffae;
  $c_settings: #8344ff;

  #q-app {
    background-color: white;
    font-family: Quicksand, serif;
    position: relative;
  }
  #server-connection-error-banner{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    backdrop-filter: blur(0.8);
    background-color: rgba(black, 0.2);
  }
  #server-connection-error-banner-content{
    background-color: #ff1c60;
    color: white;
    font-weight: bold;
    font-size: 1rem;
  }
  ::-webkit-scrollbar {
    //display: none;
    width: 6px;
    height: 6px;
    background-color: white;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    transition: 0.3s;
    // background-color: rgba($c_accent_primary, 0.5);
    background-color: rgba($c_followings, 0.5);
    border-radius: 10px;

    &:hover {
      background-color: rgba($c_followings, 0.8);
    }
  }
</style>
