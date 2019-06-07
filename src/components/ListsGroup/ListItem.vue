<template>
    <div class="list-item">
      <div class="flex flex-center">
        <q-checkbox v-model="val" />
      </div>
      <div class="list-item-content">
        <div class="list-item-avatar">
          <user-avatar size="50px"/>
        </div>
        <div class="list-item-title">
          title
        </div>
      </div>
      <div class="list-item-action">
        <q-btn round flat icon="refresh" color="primary"></q-btn>
      </div>
    </div>
</template>

<script>
import UserAvatar from '../UserAvatar'
export default {
  name: 'ListItem',
  components: { UserAvatar },
  data () {
    return {
      val: true
    }
  }
}
</script>

<style scoped lang="scss">
  .list-item {
    margin: 5px 0;
    display: grid;
    grid-template-columns: 50px 1fr 50px;
    padding: 10px;
    border-radius: 8px;
    background: white;
  }
  .list-item-content {
    display: grid;
    grid-template-columns: 100px 1fr;
    column-gap: 16px;
  }

</style>
