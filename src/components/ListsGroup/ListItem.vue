<template>
    <div class="list-item" :class="{checked: isChecked}" @click="toggleCheck">
     <!-- <div class="flex flex-center">
        &lt;!&ndash;<q-checkbox v-model="val" />&ndash;&gt;
      </div>-->
      <div class="list-item-content">
        <div class="list-item-status">
          <vue-ellipse-progress
            :progress="100"
            half
            :legend="false"
            :size="70"
            :color="statusColor"
            :thickness="2"
            emptyColor="transparent"
            :loading="false"/>
        </div>
        <div class="list-item-avatar shadow-8">
          <user-avatar size="50" :url="avatar || ''"/>
        </div>
        <div class="list-item-title ellipsis">
          <p v-if="item.user && item.user.username" class="q-ma-none">
            {{item.user.username}}
          </p>
          <a @click="openUserLinkInBrowser">
            {{item.title}}
          </a>
        </div>
      </div>
      <div class="list-item-action flex items-center">
        <q-btn round flat :icon="icon" color="primary"></q-btn>
      </div>
    </div>
</template>

<script>
import UserAvatar from 'components/Navigation/UserAvatar';
import { shell } from 'electron';

export default {
  name: 'ListItem',
  components: { UserAvatar },
  props: {
    item: {
      type: Object,
      required: true
    },
    checkedItems: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      checked: false,
      progressColor: 'transparent',
      isLoading: false
    };
  },
  computed: {
    isChecked () {
      return this.checkedItems.filter(id => this.item.id === id).length > 0;
    },
    avatar () {
      return this.item.avatar_url || this.item.artwork_url;
    },
    statusColor () {
      if (this.item.status === 'error') return 'rgba(255,113,130,0.3)';
      return !this.item.synchronized ? 'transparent' : 'rgba(60,186,146,0.3)';
    },
    icon () {
      return !this.item.synchronized ? 'fas fa-angle-right' : 'refresh';
    }
  },
  methods: {
    openUserLinkInBrowser () {
      shell.openExternal(this.item.permalink_url);
    },
    toggleCheck () {
      !this.isChecked ? this.$emit('checked', this.item.id) : this.$emit('unchecked', this.item.id);
    }
  }
};
</script>

<style scoped lang="scss">
  .list-item {
    margin: 8px 0;
    display: grid;
    grid-template-columns: /*40px */1fr 40px;
    padding: 10px;
    border-radius: 50px;
    box-shadow: 4px 9px 32px 1px rgba(0, 0, 0, 0.03);
    background: white;
    position: relative;
    overflow: hidden;
    transition: 0.3s;
    cursor: pointer;
    border: 2px transparent solid;
    &:hover {
      box-shadow: 7px 9px 32px 10px rgba(0, 0, 0, 0.06);
    }
    &.checked {
      //border: 2px rgba(34, 156, 255, 0.5) solid;
      background: rgba(34, 156, 255, 0.1);
    }
  }
  .list-item-avatar {
    height: 50px;
    border-radius: 50%;
  }
  .list-item-content {
    display: grid;
    grid-template-columns: 50px 1fr;
    column-gap: 16px;
  }

  .list-item-title {
    padding-top: 6px;
    a {
      transition: 0.3s;
      color: #2f72ff;
      cursor: pointer;
      &:hover {
        color: #8344ff;
      }
    }
  }
  .list-item-status {
    transition: 0.3s;
    width: 70px;
    border-radius: 35px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    &.waiting {
      // opacity: 0.5;
      background-image: linear-gradient(to bottom, #e6e9f0 0%, #eef1f5 100%);
    }
    &.synchronized {
      opacity: 0.2;
      background-image: linear-gradient(to bottom, #0ba360 0%, #3cba92 100%);
    }
    &.error {
      opacity: 0.2;
      background-image: linear-gradient(to bottom, #ff0844 0%, #ffb199 100%);
    }
  }

</style>
