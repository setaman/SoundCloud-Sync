<template>
  <q-page>
    <lists-group>
      <list slot="list-one" :items="likesUserOne"></list>
      <list-sync-controls slot="list-sync-controls"></list-sync-controls>
      <list slot="list-two" :items="likesUserTwo"></list>
    </lists-group>
  </q-page>
</template>
<script>
import ListsGroup from '../components/ListsGroup/ListsGroup'
import List from '../components/ListsGroup/List'
import ListSyncControls from '../components/ListsGroup/ListSyncControls'

export default {
  name: 'Likes',
  components: { ListSyncControls, List, ListsGroup },
  data: () => ({
    items: []
  }),
  computed: {
    likesUserOne () {
      return this.$store.state.users.userOne.likes
    },
    likesUserTwo () {
      return this.$store.state.users.userTwo.likes
    }
  },
  methods: {
    onChecked (itemId) {
      this.checkedItems.push(itemId)
    },
    onUnchecked (itemId) {
      const index = this.checkedItems.findIndex(item => item.id === itemId)
      this.checkedItems.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
