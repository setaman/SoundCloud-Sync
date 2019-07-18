<template>
  <q-page>
    <lists-group :items-one="[]" :items-two="[]" />
  </q-page>
</template>

<script>
import ListsGroup from '../components/ListsGroup/ListsGroup';
export default {
  name: 'Followings',
  components: { ListsGroup }
};
</script>

<style scoped>

</style>
