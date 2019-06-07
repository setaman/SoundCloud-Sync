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
              <q-btn :loading="isLoading" rounded size="lg" class="full-width" color="primary" @click="loadData">
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
import UserAvatar from '../UserAvatar'
import UserStatistics from '../Head/UserStatistics'
import loadUserData from '../../utils/loaduserData'

export default {
  name: 'SettingsForm',
  components: { UserStatistics, UserAvatar },
  data: () => ({
    step: 1,
    loaded: false,
    saved: false,
    isLoading: false
  }),
  methods: {

    async loadData () {
      this.isLoading = true
      const result = await Promise.all([loadUserData(this.userOne.userId, this.userOne.clientId, this.userOne.token),
        loadUserData(this.userTwo.userId, this.userTwo.clientId, this.userTwo.token)
      ])

      if (result[0].errors.length > 0 || result[1].errors.length > 0) {
        for (const data of result) {
          for (const error of data.errors) {
            this.notifyError(error)
          }
        }
      } else {
        this.notifySuccess('Data successful loaded')
        this.loaded = true
        this.step = 2
      }

      console.log(result)

      const loadedUserOne = result.find(data => data.user.userId === this.userOne.userId)
      const loadedUserTwo = result.find(data => data.user.userId === this.userTwo.userId)

      this.userOne = { ...this.userOne, ...loadedUserOne.user }
      this.userTwo = { ...this.userTwo, ...loadedUserTwo.user }

      this.isLoading = false
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
      this.$router.push('home')
    }
  },
  computed: {
    userOne: {
      get () {
        return this.$store.state.users.userOne
      },
      set (val) {
        this.$store.dispatch('setUserOne', val)
      }
    },
    userTwo: {
      get () {
        return this.$store.state.users.userTwo
      },
      set (val) {
        this.$store.dispatch('setUserTwo', val)
      }
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
