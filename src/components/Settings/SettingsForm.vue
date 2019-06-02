<template>
    <div class="settings-form-container q-pa-sm row">
      <div class="col-xs-12 col-sm-6 q-pa-md">
        <div class="q-gutter-md">
          <h5>Account one</h5>
          <q-input outlined v-model="userOne.userId" label="User id" />
          <q-input outlined v-model="userOne.clientId" label="Client id" />
          <q-input outlined v-model="userOne.token" label="Access token" />
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 q-pa-md">
        <div class="q-gutter-md">
          <h5>Account Two</h5>
          <q-input outlined v-model="userTwo.userId" label="User id" />
          <q-input outlined v-model="userTwo.clientId" label="Client id" />
          <q-input outlined v-model="userTwo.token" label="Access token" />
        </div>
      </div>
      <div class="col-xs-12 q-pa-md">
        <q-btn :loading="isLoading" rounded size="lg" class="full-width" color="green" @click="loadUsersData">
          check data
        </q-btn>
      </div>
    </div>
</template>

<script>
import { getUserById, getUserTracks, getUserFollowings, addUserFollowing } from '../../api'

export default {
  name: 'SettingsForm',
  data: () => ({
    isLoading: false,
    userOne: {
      userId: '242833986',
      clientId: 'u8j5bvKLMEY0eVwyQGQMQWC0ArjMYDOz',
      username: '',
      userUrl: '',
      token: '2-290343-242833986-m8W383xIw0w3r0',
      cover: '',
      avatar: '',
      likes: [],
      followings: [],
      playlists: []
    },
    userTwo: {
      username: '',
      userUrl: '',
      userId: '644611317',
      clientId: 'u8j5bvKLMEY0eVwyQGQMQWC0ArjMYDOz',
      token: '2-290343-242833986-m8W383xIw0w3invalid',
      cover: '',
      avatar: '',
      likes: [],
      followings: [],
      playlists: []
    }
  }),
  methods: {
    async loadUsersData () {
      let promises = [ getUserById(this.userOne.userId, this.userOne.clientId),
        getUserById(this.userTwo.userId, this.userTwo.clientId)]

      const users = await Promise.all(promises.map(p => {
        p.catch(e => {
          console.log(e)
          this.notifyError(e)
        })
        p.then(response => {
          console.log(response)
          this.notifySuccess(`Successful connected to ${response.data.username}`, response.data.avatar_url)
        })
        return p
      }))

      const dataOne = users[0].data
      const dataTwo = users[1].data

      for (const prop of [ 'avatar_url', 'username', 'permalink_url' ]) {
        this.userOne[prop] = dataOne[prop]
      }

      for (const prop of [ 'avatar_url', 'username', 'permalink_url' ]) {
        this.userTwo[prop] = dataTwo[prop]
      }

      const likes = await this.loadUsersLikes()
      this.userOne.likes = likes[0]
      this.userTwo.likes = likes[1]
      const followings = await this.loadUsersFollowings()
      this.userOne.followings = followings[0]
      this.userTwo.followings = followings[1]
      await this.checkUsersToken()
    },

    async loadUsersLikes () {
      let promises = [ getUserTracks(this.userOne.userId, this.userOne.clientId),
        getUserTracks(this.userTwo.userId, this.userTwo.clientId)]

      const likes = await Promise.all(promises.map((p, i) => {
        const currentUser = i === 0 ? this.userOne : this.userTwo
        console.log('CURRENT', i, currentUser)
        p.catch(e => {
          console.log(e)
          this.notifyError(e)
        })
        p.then(response => {
          console.log(response)
          this.notifySuccess(`${currentUser.username} has ${response.length} Likes`, currentUser.avatar_url)
        })
        return p
      }))

      console.log(likes)
      return likes
    },

    async loadUsersFollowings () {
      let promises = [ getUserFollowings(this.userOne.userId, this.userOne.clientId),
        getUserFollowings(this.userTwo.userId, this.userTwo.clientId)]

      const followings = await Promise.all(promises.map((p, i) => {
        const currentUser = i === 0 ? this.userOne : this.userTwo
        p.catch(e => {
          console.log(e)
          this.notifyError(e)
        })
        p.then(response => {
          console.log(response)
          this.notifySuccess(`${currentUser.username} has ${response.length} followings`, currentUser.avatar_url)
        })
        return p
      }))

      console.log(followings)
      return followings
    },

    async checkUsersToken () {
      let promises = [ addUserFollowing('', this.userOne.token),
        addUserFollowing('', this.userTwo.token)]

      await Promise.all(promises.map((p, i) => {
        const currentUser = i === 0 ? this.userOne : this.userTwo
        p.catch(e => {
          console.log(e.response.status)
          if (e.response.status === 401) {
            this.notifyError(`Toke for ${currentUser.username} seems to b invalid`, currentUser.avatar_url)
          } else if (e.response.status === 404) {
            this.notifySuccess(`Token successful validated for ${currentUser.username}`, currentUser.avatar_url)
          }
        })
        p.then(response => {
          console.log(response)
          this.notifySuccess(`Token successful validated for ${currentUser.username}`, currentUser.avatar_url)
        })
        return p
      }))
    },

    notifySuccess (message, avatar) {
      this.$q.notify({
        message,
        color: 'green',
        avatar,
        position: 'top-right'
      })
    },

    notifyError (message) {
      this.$q.notify({
        message,
        color: 'red',
        position: 'top-right'
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .settings-form-container {
    background-color: white;
    border-radius: 8px;
  }

</style>
