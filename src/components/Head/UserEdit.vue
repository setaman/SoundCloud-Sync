<template>

  <q-dialog v-model="dialog.open">
    <q-card>
      <div class="user-cover" :style="bgImage"></div>
      <div class="user-avatar">
        <div class="text-center">
          <user-avatar :url="avatar"/>
          <h5 class="q-ma-none">
            <a class="user-url" @click="openUserLinkInBrowser">{{username}}</a>
          </h5>
        </div>
      </div>

      <q-card-section>
        <div class="row q-col-gutter-md q-pt-xl q-mt-md">
          <div class="form-header col text-h6 ellipsis">Edit user connection data</div>
          <div class="col-xs-12">
            <q-input outlined v-model="userId" label="User id*" :error="isInvalidUserId" bottom-slots>
              <template v-slot:error>
                {{!userIdEdited ? 'please edit credentials consistently' : inputErrorMsg}}
              </template>
            </q-input>
          </div>
          <div class="col-xs-12">
            <q-input outlined v-model="clientId" label="Client id*" :error="isInvalidClientId" bottom-slots>
              <template v-slot:error>
                {{!clientIdEdited ? 'please edit credentials consistently' : inputErrorMsg}}
              </template>
            </q-input>
          </div>
          <div class="col-xs-12">
            <q-input outlined v-model="token" label="Access token*" :error="isInvalidToken" bottom-slots>
              <template v-slot:error>
                {{!tokenEdited ? 'please edit credentials consistently' : inputErrorMsg}}
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>

      <q-separator/>

      <q-card-actions align="right">
        <q-btn color="primary" size="md" :disabled="!inputIsValid" rounded :loading="isLoading" @click="getUser">load data</q-btn>
        <q-btn color="green" size="md" rounded :disabled="!isValid" :loading="isLoading" @click="emitSaveEvent" v-close-popup>save data</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import UserAvatar from '../UserAvatar'
import loadUserData from '../../utils/loaduserData'
import { shell } from 'electron'
import NotificationMixin from '../notificationMixin'
import getBackgroundImage from '../../utils/generateBackgroundImage'

export default {
  name: 'UserEdit',
  components: { UserAvatar },
  mixins: [NotificationMixin],
  props: {
    dialog: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // save initial date to detect changes
      initialUserId: this.user.userId,
      initialClientId: this.user.clientId,
      initialToken: this.user.token,

      inputErrorMsg: 'This field is required',

      bgImage: '',

      isLoading: false,
      isValid: false,
      userId: this.user.userId,
      clientId: this.user.clientId,
      token: this.user.token,
      avatar: this.user.avatar_url,
      username: this.user.username,
      url: this.user.permalink_url,
      likes: [],
      followings: [],
      playlists: []
    }
  },
  computed: {
    isInvalidClientId () {
      return this.clientId.length === 0 || (!this.clientIdEdited && (this.userIdEdited || this.tokenEdited))
    },
    isInvalidUserId () {
      return (this.userId.length === 0) || (!this.userIdEdited && (this.clientIdEdited || this.tokenEdited))
    },
    isInvalidToken () {
      return this.token.length === 0 || (!this.tokenEdited && (this.userIdEdited || this.clientIdEdited))
    },
    inputIsValid () {
      return !this.isInvalidClientId && !this.isInvalidUserId && !this.isInvalidToken
    },

    userIdEdited () {
      return this.userId !== this.initialUserId
    },
    clientIdEdited () {
      return this.clientId !== this.initialClientId
    },
    tokenEdited () {
      return this.token !== this.initialToken
    }
  },
  methods: {
    async getUser () {
      this.isLoading = true
      this.isValid = false
      try {
        let response = await loadUserData(this.userId, this.clientId, this.token)
        console.log(response)
        if (response.errors.length > 0) {
          for (const error of response.errors) {
            this.notifyError(error)
          }
        } else {
          const { avatar_url, followings, likes, permalink_url, username } = response.user
          this.avatar = avatar_url
          this.username = username
          this.url = permalink_url
          this.likes = likes
          this.followings = followings

          this.notifySuccess('Data successful loaded')
          this.isValid = true
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },
    emitSaveEvent () {
      this.$emit('save', {
        userId: this.userId,
        clientId: this.clientId,
        token: this.token,
        avatar_url: this.avatar,
        permalink_url: this.url,
        username: this.username,
        likes: this.likes,
        followings: this.followings,
        playlists: this.playlists
      })
    },
    openUserLinkInBrowser () {
      shell.openExternal(this.url)
    },
    async backgroundImage () {
      // eslint-disable-next-line no-return-await
      this.bgImage = await getBackgroundImage(this.avatar)
    }
  },
  mounted () {
    console.log('MOUNT')
    this.backgroundImage()
  }
}
</script>

<style scoped lang="scss">
  .user-cover {
    height: 150px;
    border-bottom-left-radius: 50px !important;
    border-bottom-right-radius: 50px !important;
    overflow: hidden;
  }
  .user-avatar {
    position: absolute;
    height: 100px;
    width: 100%;
    left: 0;
    top: 90px;
  }

  .form-header {
    font-family: "Quicksand Medium", serif;
  }

  .user-url {
    transition: 0.3s;
    font-family: "Quicksand Medium", serif;
    color: #2f72ff;
    text-decoration: none;
    position: relative;
    z-index: 10;
    cursor: pointer;
    &:hover {
      color: #8344ff;
    }
  }

</style>
