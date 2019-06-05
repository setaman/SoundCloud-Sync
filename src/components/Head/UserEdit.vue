<template>

  <q-dialog v-model="dialog.open">
    <q-card>
      <q-img style="height: 150px;"
             :src="avatar"/>

      <div class="user-avatar">
        <div class="text-center">
          <user-avatar :url="avatar"/>
          <h5 class="q-ma-none">{{username}}</h5>
        </div>
      </div>

      <q-card-section>
        <div class="row q-col-gutter-md q-pt-xl q-mt-md">
          <div class="col text-h6 ellipsis">Provide connection data</div>
          <div class="col-xs-12">
            <q-input outlined v-model="userId" label="User id"/>
          </div>
          <div class="col-xs-12">
            <q-input outlined v-model="clientId" label="Client id"/>
          </div>
          <div class="col-xs-12">
            <q-input outlined v-model="token" label="Access token"/>
          </div>
        </div>
      </q-card-section>

      <q-separator/>

      <q-card-actions align="right">
        <q-btn color="primary" size="md" rounded :loading="isLoading" @click="getUser">load data</q-btn>
        <q-btn color="green" size="md" rounded :disabled="!isValid" :loading="isLoading" @click="getUser">save data</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import UserAvatar from '../UserAvatar'
import { getUserById } from '../../api'

export default {
  name: 'UserEdit',
  components: { UserAvatar },
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
      isLoading: false,
      isValid: false,
      userId: this.user.userId,
      clientId: this.user.clientId,
      token: this.user.token,
      avatar: this.user.avatar_url,
      username: this.user.username
    }
  },
  methods: {
    async getUser () {
      this.isLoading = true
      try {
        let response = await getUserById(this.userData.userId, this.userData.clientId)
        const { avatar_url, permalink_url, username, plan } = response.data
        console.log(response)
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .user-avatar {
    position: absolute;
    height: 100px;
    width: 100%;
    left: 0;
    top: 90px;
  }

</style>
