<template>
  <q-page>
    <logo/>
    <lists-group :items-one="[]" :items-two="[]" />
  </q-page>
</template>

<script>
import ListsGroup from 'components/ListsGroup/ListsGroup';
import Logo from 'components/Base/Logo';
export default {
  name: 'Followings',
  components: { Logo, ListsGroup }
};
</script>

<style scoped>

</style>
