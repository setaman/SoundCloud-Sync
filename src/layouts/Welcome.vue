<template>
<div id="welcome" class="fullscreen flex flex-center">
  <div class="text-center">
    <h3>
      Welcome to SoundCloudSync
    </h3>
    <div>
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
      <q-btn @click="startInitialization">
        send
      </q-btn>
    </div>
    <p class="msg q-mt-md" :class="{blinking: blinking}">
      {{msg}}
    </p>
  </div>
</div>
</template>

<script>
import { SOCKET_INITIALIZATION_START, SOCKET_INITIALIZATION_FAIL, SOCKET_INITIALIZATION_SUCCESS } from 'src/utils/socketEvents.js'
export default {
  name: 'Welcome',
  data: () => ({
    msg: 'Loading data...',
    blinking: true
  }),
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    [SOCKET_INITIALIZATION_START] () {
      this.msg = 'Loading data...'
      this.$store.dispatch('startInitialization')
    },
    [SOCKET_INITIALIZATION_SUCCESS] () {
      console.log('SUCC')
      this.blinking = false
      this.$store.dispatch('successInitialization')
    },
    [SOCKET_INITIALIZATION_FAIL] (msg) {
      this.msg = msg
      this.blinking = false
      this.$store.dispatch('failInitialization')
    }
  },
  computed: {
    userOne () {
      return this.$store.state.users.userOne
    },
    userTwo () {
      return this.$store.state.users.userTwo
    }
  },
  methods: {
    startInitialization () {
      console.log('SENDING..')
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
      })
    },
    async loadUsersData () {
      if (!this.userOne.userId || !this.userTwo.userId) {
        this.msg = 'User data not found!!!'
        setTimeout(() => {
          this.$router.push('settings')
        }, 1500)
        return
      }

      try {
        const response = await this.$store.dispatch('startInitialization', {
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
        })
        console.log(response)
        this.msg = response.data
        setTimeout(() => {
          // this.$router.push('home')
        }, 1000)
      } catch (e) {
        console.error(e)
        this.msg = e
        setTimeout(() => {
          // this.$router.push('settings')
        }, 1500)
      } finally {
        this.blinking = false
      }
    }
  },
  mounted () {
    // this.loadUsersData()
  }
}
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
