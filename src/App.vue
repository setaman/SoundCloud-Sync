<template>
  <div id="q-app">
    <transition
      appear
      enter-active-class="animated fadeIn slideInDown"
      leave-active-class="animated fadeOut slideOutUp"
    >
      <div v-if="serverError" id="server-connection-error-banner" class="full-width full-height text-center">
        <div id="server-connection-error-banner-content" class="full-width q-pa-md">
          <p>
            Oh no, an error occurred in the internal process of the app. Try to restart the app. If this does not help,
            let me now what is happened!
          </p>
          <p class="q-ma-none" v-html="serverError">
          </p>
          <p class="q-ma-none">
            Reconnection Attempts: {{reconnectionAttempts}} / 5
          </p>
          <lottie :options="animationOptions"/>
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
import ViewsTransition from 'components/Transitions/ViewsTransition';
import Lottie from 'components/Base/Lottie';
import errorAnimation from 'src/lottie-animations/error.json';
const { ipcRenderer } = require('electron');

export default {
  name: 'App',
  components: { Lottie, ViewsTransition },
  mixins: [notificationMixin],
  data: () => ({
    serverError: '',
    serverPort: '',
    reconnectionAttempts: 0,
    animationOptions: {
      animationData: errorAnimation
    }
  }),
  sockets: {
    connect () {
      console.log('SOCKET CONNECTED');
      this.serverError = '';
    },
    connecting () {
      console.log('SOCKET CONNECTING');
    },
    reconnecting () {
      console.log('SOCKET RECONNECTING');
      this.reconnectionAttempts++;
      this.tryGetPort();
    },
    disconnect (msg) {
      console.error('SOCKET DISCONNECTED');
      this.generateServerError('Disconnected from WS', msg);
    },
    error (error) {
      console.error('SOCKET CONNECTION ERROR');
      this.generateServerError('WS connection error', error);
    },
    connect_error (error) {
      console.error('SOCKET INITIAL CONNECTION ERROR', error);
      this.generateServerError('Initial connection error wit ws', error);
    }
  },
  methods: {
    connectToServer () {
      this.$socket.close();
      this.$socket.disconnect();
      this.$socket.io.uri = 'http://localhost:' + this.serverPort;
      this.$socket.connect();
    },
    reconnectToServer () {
      this.$socket.io.uri = 'http://localhost:' + this.serverPort;
    },
    tryGetPort () {
      ipcRenderer.send('getServerPort');
    },
    generateServerError (msg, errorMsg) {
      this.serverError = `
        <p class="q-ma-none">${msg}</p>
        <p class="q-ma-none">clientUrl: ${this.$socket.io.uri}</p>
        <p class="q-ma-none">serverUrl: http://localhost:${this.serverPort}</p>
        <p>errorMsg: http: ${errorMsg}</p>
      `;
    }
  },
  mounted () {
    console.log(this.$socket);
    ipcRenderer.on('serverPort', (event, port) => {
      console.log('ON GET PORT', port);
      this.serverPort = port;
      if (this.reconnectionAttempts > 0) {
        this.reconnectToServer();
      } else {
        this.connectToServer();
      }
    });
    ipcRenderer.on('serverPortError', (event, error) => {
      console.log(error);
      this.serverError = `Initial connection error with ws.
          clientUri: ${this.$socket.io.uri},
          ${error}
        `;
    });
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
    backdrop-filter: blur(5px);
    background-color: rgba(black, 0.2);
  }
  #server-connection-error-banner-content{
    background-color: #ff6071;
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
