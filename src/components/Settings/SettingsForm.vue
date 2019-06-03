<template>
    <div class="settings-form-container row">
      <q-stepper
        class="full-width"
        v-model="step"
        flat
        ref="stepper"
        color="primary"
        animated
        alternative-labels
      >
        <q-step
          header-nav
          :name="1"
          title="Edit credentials and load data"
          icon="settings"
          :done="loaded"
        >
          <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-6">
              <div class="q-gutter-md">
                <h5>Account one</h5>
                <q-input outlined v-model="userOne.userId" label="User id" />
                <q-input outlined v-model="userOne.clientId" label="Client id" />
                <q-input outlined v-model="userOne.token" label="Access token" />
              </div>
            </div>
            <div class="col-xs-12 col-sm-6">
              <div class="q-gutter-md">
                <h5>Account Two</h5>
                <q-input outlined v-model="userTwo.userId" label="User id" />
                <q-input outlined v-model="userTwo.clientId" label="Client id" />
                <q-input outlined v-model="userTwo.token" label="Access token" />
              </div>
            </div>
            <div class="col-xs-12">
              <q-btn :loading="isLoading" rounded size="lg" class="full-width" color="green" @click="loadUsersData">
                check data
              </q-btn>
            </div>
          </div>
        </q-step>

        <q-step
          :name="2"
          title="Check and save"
          caption=""
          icon="done"
          :done="saved"
        >
          <div class="row q-col-gutter-lg">
            <div class="col-xs-12 col-sm-6">
              <div class="q-gutter-md text-center">
                <user-avatar :url="userOne.avatar_url"/>
                <p>{{userOne.username}}</p>
                <user-statistics :likes="userOne.likes.length" :followings="userOne.followings.length" :playlists="userOne.playlists.length"/>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6">
              <div class="q-gutter-md text-center">
                <user-avatar :url="userTwo.avatar_url"/>
                <p>{{userTwo.username}}</p>
                <user-statistics :likes="userTwo.likes.length" :followings="userTwo.followings.length" :playlists="userTwo.playlists.length"/>
              </div>
            </div>
            <div class="col-xs-12">
              <q-btn :loading="isLoading" rounded size="lg" class="full-width" color="green" @click="persistData">
                save data
              </q-btn>
            </div>
          </div>
        </q-step>
      </q-stepper>
    </div>
</template>

<script>
import { getUserById, getUserTracks, getUserFollowings, addUserFollowing } from '../../api'
import UserAvatar from '../UserAvatar'
import UserStatistics from '../Head/UserStatistics'

export default {
  name: 'SettingsForm',
  components: { UserStatistics, UserAvatar },
  data: () => ({
    step: 1,
    loaded: false,
    saved: false,
    isLoading: false,
    userOne: {
      userId: '242833986',
      clientId: 'u8j5bvKLMEY0eVwyQGQMQWC0ArjMYDOz',
      username: '',
      permalink_url: '',
      token: '2-290343-242833986-m8W383xIw0w3r0',
      cover: '',
      avatar_url: '',
      likes: [],
      followings: [],
      playlists: []
    },
    userTwo: {
      username: '',
      permalink_url: '',
      userId: '644611317',
      clientId: 'u8j5bvKLMEY0eVwyQGQMQWC0ArjMYDOz',
      token: '2-290343-242833986-m8W383xIw0w3invalid',
      cover: '',
      avatar_url: '',
      likes: [],
      followings: [],
      playlists: []
    }
  }),
  methods: {
    async loadUsersData () {
      this.isLoading = true
      try {
        let promises = [ getUserById(this.userOne.userId, this.userOne.clientId),
          getUserById(this.userTwo.userId, this.userTwo.clientId)]

        const users = await Promise.all(promises.map(p => {
          p.catch(e => {
            console.log(e)
            this.notifyError(e)
          })
          p.then(response => {
            console.log(response)
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
        this.loaded = true
        this.notifySuccess(`Successful connected to users`, '')
      } catch (e) {
        console.info(e)
      } finally {
        this.step = 2
        this.isLoading = false
      }
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
            this.notifyError(`Token for ${currentUser.username} seems to be invalid`, currentUser.avatar_url)
          } else if (e.response.status === 404) {
            // this.notifySuccess(`Token successful validated for ${currentUser.username}`, currentUser.avatar_url)
          }
        })
        p.then(response => {
          console.log(response)
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
    },

    persistData () {
      this.$store.dispatch('setUserOne', this.userOne)
      this.$store.dispatch('setUserTwo', this.userTwo)
      console.log(this.$store.state)
    }
  }
}
</script>

<style scoped lang="scss">
  .settings-form-container {
    min-width: 50vw;
    background-color: white;
    border-radius: 8px;
  }

</style>
