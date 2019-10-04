<template>
  <q-page class="q-px-lg q-pt-xl q-px-xs-sm">
    <lists-group-wrapper :items-type="listType"/>
  </q-page>
</template>
<script>

import { LIST_TYPE_FOLLOWINGS } from 'src/background/const/const.js';
import ListsGroupWrapper from 'components/ListsGroup/ListsGroupWrapper';

export default {
  name: 'Followings',
  components: { ListsGroupWrapper },
  data: () => ({
    listType: LIST_TYPE_FOLLOWINGS
  })
};
</script>
