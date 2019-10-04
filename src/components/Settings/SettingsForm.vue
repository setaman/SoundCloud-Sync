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
          <form @submit.prevent="startInitialization">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-6">
                <div class="q-gutter-md">
                  <h5>Account one</h5>
                  <q-input outlined v-model="userOne.userId" label="User id"/>
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
                <q-btn :loading="isLoading" type="submit" :disable="!formIsFilledIn" rounded size="lg"
                       class="full-width" color="primary">
                  load data
                </q-btn>
              </div>
            </div>
          </form>
        </q-step>

        <q-step
          :name="2"
          title="Check and save"
          caption=""
          icon="done"
          :done="saved"
        >
          <div v-if="loaded" class="row q-col-gutter-lg">
            <div class="col-xs-12 col-sm-6">
              <div class="q-gutter-md text-center">
                <user-avatar :url="userOne.avatar_url"/>
                <p>{{userOne.username}}</p>
                <user-statistics :likes="userOne.likes" :followings="userOne.followings" :playlists="userOne.playlists"/>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6">
              <div class="q-gutter-md text-center">
                <user-avatar :url="userTwo.avatar_url"/>
                <p>{{userTwo.username}}</p>
                <user-statistics :likes="userTwo.likes" :followings="userTwo.followings" :playlists="userTwo.playlists"/>
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
import UserAvatar from 'components/Navigation/UserAvatar';
import UserStatistics from 'components/Settings/UserStatisticsCheck';
import initializationMixin from 'components/initializationMixin';

import { SOCKET_INITIALIZATION_START } from 'src/background/const/socketEvents.js';

const userPlaceholder = { userId: '', token: '', clientId: '' };

export default {
  name: 'SettingsForm',
  components: { UserStatistics, UserAvatar },
  mixins: [initializationMixin],
  data () {
    return {
      step: 1,
      loaded: false,
      saved: false,
      userOne: userPlaceholder,
      userTwo: userPlaceholder
    };
  },

  methods: {

    startInitialization () {
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
    },
    onDataLoaded (usersData) {
      console.log('USERS', usersData);
      this.userOne = usersData.userOne;
      this.userTwo = usersData.userTwo;
      this.loaded = true;
      this.step = 2;
    },
    onInitialisationSuccess () {
      console.log('initialized');
    },
    persistData () {
      this.$store.dispatch('setUserOne', this.userOne);
      this.$store.dispatch('setUserTwo', this.userTwo);
      this.$router.push('home');
    }
  },
  computed: {
    formIsFilledIn () {
      return this.userOne.userId && this.userOne.token && this.userOne.clientId &&
        this.userTwo.userId && this.userTwo.token && this.userTwo.clientId;
    },
    persistedUserOne () {
      return this.$store.state.users.userOne;
    },
    persistedUserTwo () {
      return this.$store.state.users.userTwo;
    }
  },
  mounted () {
    this.userOne = { ...this.persistedUserOne };
    this.userTwo = { ...this.persistedUserTwo };
  }
};
</script>

<style scoped lang="scss">
  .settings-form-container {
    min-width: 50vw;
    background-color: white;
    border-radius: 8px;
  }

</style>
