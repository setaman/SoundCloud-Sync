<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <h2>{{items.length}}</h2>
        <q-btn @click="getLikes">
          load
        </q-btn>
        <q-list bordered separator>
          <q-item v-for="(item, i) in items" :key="i" clickable v-ripple>
            <q-item-section>{{item}}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>
<script>
import { getUserTracks } from '../api'

export default {
  name: 'Likes',
  data: () => ({
    items: []
  }),
  computed: {
    likes () {
      return this.items
    }
  },
  methods: {
    async getLikes () {
      let response = await getUserTracks()
      this.items = response.map(item => item.track.title)
    }
  },
  mounted () {
    // this.getLikes()
  }
}
</script>

<style scoped>

</style>
