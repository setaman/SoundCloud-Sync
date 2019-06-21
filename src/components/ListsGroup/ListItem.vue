<template>
    <div class="list-item">
     <!-- <div class="flex flex-center">
        &lt;!&ndash;<q-checkbox v-model="val" />&ndash;&gt;
      </div>-->
      <div class="list-item-content">
        <div class="list-item-avatar shadow-8" :style="randomGradient">
          <user-avatar v-if="avatar" size="50px" :url="avatar"/>
        </div>
        <div class="list-item-title ellipsis">
          <a @click="openUserLinkInBrowser">
            {{item.title}}
          </a>
        </div>
      </div>
      <div class="list-item-action flex items-center">
        <q-btn round flat icon="refresh" color="primary"></q-btn>
      </div>
      <div :class="[item.status]" class="list-item-status synchronized"></div>
    </div>
</template>

<script>
import UserAvatar from '../UserAvatar'
import { shell } from 'electron'

export default {
  name: 'ListItem',
  components: { UserAvatar },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      val: true,
      gradients: [
        'to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%',
        '120deg, #84fab0 0%, #8fd3f4 100%',
        '135deg, #667eea 0%, #764ba2 100%',
        'to right, #4facfe 0%, #00f2fe 100%',
        'to right, #74ebd5 0%, #9face6 100%'
      ]
    }
  },
  computed: {
    avatar () {
      return this.item.avatar_url || this.item.artwork_url
    },
    randomGradient () {
      const randomNumber = Math.floor(Math.random() * (4 + 1))
      return `background-image: linear-gradient(${this.gradients[randomNumber]})`
    }
  },
  methods: {
    openUserLinkInBrowser () {
      shell.openExternal(this.item.permalink_url)
    }
  }
}
</script>

<style scoped lang="scss">
  .list-item {
    margin: 8px 0;
    display: grid;
    grid-template-columns: /*40px */1fr 40px;
    padding: 10px;
    border-radius: 50px;
    box-shadow: 7px 9px 32px 1px rgba(0, 0, 0, 0.05);
    background: white;
    position: relative;
    overflow: hidden;
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
    padding-top: 18px;
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
    width: 4px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    &.waiting {
      // opacity: 0.5;
      background-image: linear-gradient(to bottom, #e6e9f0 0%, #eef1f5 100%);
    }
    &.synchronized {
      opacity: 0.5;
      background-image: linear-gradient(to bottom, #0ba360 0%, #3cba92 100%);
    }
    &.error {
      opacity: 0.5;
      background-image: linear-gradient(to bottom, #ff0844 0%, #ffb199 100%);
    }
  }

</style>
