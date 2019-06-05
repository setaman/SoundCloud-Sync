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
    </div>
    <p class="msg q-mt-md" :class="{blinking: blinking}">
      {{msg}}
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: 'Welcome',
  data: () => ({
    msg: 'Loading data...',
    blinking: true
  }),
  methods: {
    async loadUsersData () {
      try {
        await this.$store.dispatch('loadUsersData')
        console.log('Data loaded successful')
        this.msg = 'Data loaded successful'
        setTimeout(() => {
          this.$router.push('home')
        }, 1000)
      } catch (e) {
        console.log(e)
        this.msg = 'Data loaded successful'
        setTimeout(() => {
          this.$router.push('settings')
        }, 1500)
      } finally {
        this.blinking = false
      }
    }
  },
  mounted () {
    this.loadUsersData()
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
