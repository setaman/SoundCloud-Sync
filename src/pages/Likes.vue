<template>
  <q-page>
    <lists-group :items-one="[]" :items-two="[]"/>
  </q-page>
</template>
<script>
import { getUserTracks } from '../api'
import ListsGroup from '../components/ListsGroup/ListsGroup'

export default {
  name: 'Likes',
  components: { ListsGroup },
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
