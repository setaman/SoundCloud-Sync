<template>

  <q-dialog v-model="dialog.open">
    <q-card>
      <q-img style="height: 150px;"
             src="https://i1.sndcdn.com/visuals-000000347068-Tx4Gls-original.jpg"/>

      <div class="user-avatar">
        <div class="text-center">
          <user-avatar/>
          <h5 class="q-ma-none">User name</h5>
        </div>
      </div>

      <q-card-section>
        <div class="row q-col-gutter-md q-pt-xl q-mt-md">
          <div class="col text-h6 ellipsis">Provide connections data</div>
          <div class="col-xs-12">
            <q-input outlined v-model="userData.userId" label="User id"/>
          </div>
          <div class="col-xs-12">
            <q-input outlined v-model="userData.clientId" label="Client id"/>
          </div>
          <div class="col-xs-12">
            <q-input outlined v-model="userData.token" label="Access token"/>
          </div>
        </div>
      </q-card-section>

      <q-separator/>

      <q-card-actions align="right">
        <q-btn flat outline rounded v-close-popup color="red">close</q-btn>
        <q-btn color="green" size="md" rounded :loading="isLoading" @click="getUser">update data</q-btn>
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
      userData: this.user
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
