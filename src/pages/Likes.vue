<template>
  <q-page>
    <lists-group :items-one="likesUserOne" :items-two="likesUserTwo"/>
  </q-page>
</template>
<script>
import ListsGroup from '../components/ListsGroup/ListsGroup'

export default {
  name: 'Likes',
  components: { ListsGroup },
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
  }
}
</script>

<style scoped>

</style>
