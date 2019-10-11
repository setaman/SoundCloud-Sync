<template>
    <div class="settings-form-container row">
      <q-stepper
        class="full-width"
        v-model="step"
        header-nav
        flat
        ref="stepper"
        color="primary"
        animated
        alternative-labels
      >
        <template v-slot:message>
          <div class="stepper-message text-center">
            <h5 class="q-mb-sm">
              First Add credentials of the accounts that your want to sync
            </h5>
            <q-btn rounded flat size="sm" color="info" @click="alert = true">seriously?</q-btn>
          </div>
        </template>
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
                  <h6 class="q-mb-md">Account one</h6>
                  <q-input outlined v-model="userOne.userId" label="User id"/>
                  <q-input outlined v-model="userOne.clientId" label="Client id" />
                  <q-input outlined v-model="userOne.token" label="Access token" />
                </div>
              </div>
              <div class="col-xs-12 col-sm-6">
                <div class="q-gutter-md">
                  <h6 class="q-mb-md">Account Two</h6>
                  <q-input outlined v-model="userTwo.userId" label="User id" />
                  <q-input outlined v-model="userTwo.clientId" label="Client id" />
                  <q-input outlined v-model="userTwo.token" label="Access token" />
                </div>
              </div>
              <div class="col-xs-12">
                <q-btn :loading="isLoading" type="submit" :disable="!formIsFilledIn" rounded size="lg"
                       class="full-width primary" color="primary">
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
          :header-nav="loaded"
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
              <q-btn :loading="isLoading" rounded size="lg" class="full-width success" color="green" @click="persistData">
                save data and proceed
              </q-btn>
            </div>
          </div>
        </q-step>
      </q-stepper>

      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-center">
              <lottie :options="lockedOptions"></lottie>
            </div>
          </q-card-section>

          <q-card-section>
            <p>
              Yeah. Currently SoundCloud API is closed so we can not do this annoying stuff programmatically and
              need this workaround.
              To get the credentials you need advanced knowledge of how your browser is working.
            </p>
            <p>
              <b>Pro tip:</b>
              Every time your like some song or artist on SoundCloud your browser sends all the data you need
            </p>
            <div class="text-center">
              <lottie :options="browserOptions"></lottie>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat rounded label="nice hack" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
</template>

<script>
import UserAvatar from 'components/Navigation/UserAvatar';
import UserStatistics from 'components/Settings/UserStatisticsCheck';
import initializationMixin from 'components/initializationMixin';

import { SOCKET_INITIALIZATION_START } from 'src/background/const/socketEvents.js';
import lockedAnimation from 'src/lottie-animations/locked.json';
import browserAnimation from 'src/lottie-animations/browser.json';
import Lottie from 'components/Base/Lottie';

const userPlaceholder = { userId: '', token: '', clientId: '' };

export default {
  name: 'SettingsForm',
  components: { Lottie, UserStatistics, UserAvatar },
  mixins: [initializationMixin],
  data () {
    return {
      step: 1,
      loaded: false,
      saved: false,
      userOne: userPlaceholder,
      userTwo: userPlaceholder,
      alert: false,
      lockedOptions: {
        animationData: lockedAnimation,
        height: 100,
        width: 400
      },
      browserOptions: {
        animationData: browserAnimation,
        height: 100,
        width: 400
      }
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

  .stepper-message {
    //font-size: 1.5rem;
  }

</style>
