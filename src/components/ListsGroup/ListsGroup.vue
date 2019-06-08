<template>
  <section class="list-group-section q-pa-lg">
    <div>
      <list-controls :filters.sync="filtersOne" :selected="filteredItemsOne.length" :max="itemsOne.length"/>
      <div class="q-pt-md q-pb-sm">
        <divider></divider>
      </div>
      <q-infinite-scroll @load="onLoad" :scroll-target="$refs.scrollTargetRef">
        <list-items-transition ref="scrollTargetRef">
          <list-item v-for="item in loadedItemsOne" :key="item.id" :item="item"/>
        </list-items-transition>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-audio
              color="orange"
              size="2em"
            />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
    <div>Sync</div>
    <div>
      <list-controls :filters.sync="filtersTwo" :selected="filteredItemsOne.length" :max="itemsTwo.length"/>
      <div class="q-pt-md q-pb-sm">
        <divider></divider>
      </div>
      <q-infinite-scroll @load="onLoad">
        <list-item v-for="item in loadedItemsTwo" :key="item.id" :item="item"/>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-audio
              color="orange"
              size="2em"
            />
          </div>
        </template>
      </q-infinite-scroll>
    </div>

  </section>
</template>

<script>
import ListItem from './ListItem'
import ListItemsTransition from '../Transitions/ListItemsTransition'
import ListControls from './ListControls'
import Divider from '../Base/Divider'

const STATUS_SYNCHRONIZED = 'synchronized'
const STATUS_WAITING = 'waiting'
const STATUS_EXIST = 'exist'
const STATUS_ERROR = 'error'

export default {
  name: 'ListsGroup',
  components: { Divider, ListControls, ListItemsTransition, ListItem },
  props: {
    itemsOne: {
      type: Array,
      required: true
    },
    itemsTwo: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    offset: 30,
    filtersOne: {
      title: '',
      status: [STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_EXIST, STATUS_ERROR],
      sort: 'Oldest',
      all: true
    },
    filtersTwo: {
      title: '',
      status: [STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_EXIST, STATUS_ERROR],
      sort: 'Oldest',
      all: true
    }
  }),
  computed: {
    loadedItemsOne () {
      return this.filteredItemsOne.slice(0, this.offset)
    },
    filteredItemsOne () {
      return this.sortItems(this.filterItems(this.itemsOne))
    },
    loadedItemsTwo () {
      return this.itemsTwo.slice(0, this.offset)
    }
  },
  methods: {
    onLoad (index, done) {
      if (this.offset < this.itemsOne.length || this.offset < this.itemsTwo.length) {
        this.offset = this.offset * 2
        console.log('LOAD', this.offset)
      }
      done()
    },
    filterItems (items) {
      let filteredItems = items.filter(item =>
        this.filtersOne.status.join(' ').includes(item.status)
      )

      if (this.filtersOne.title) {
        filteredItems = filteredItems.filter(item => item.title.toLowerCase().includes(this.filtersOne.title.toLowerCase()))
      }

      return filteredItems
    },
    sortItems (items) {
      if (items.length === 0) {
        return []
      }
      switch (this.filtersOne.sort.toLowerCase()) {
        case 'oldest':
          return items.sort((a, b) => {
            if (a.order < b.order) {
              return 1
            }
            if (a.order > b.order) {
              return -1
            }
            return 0
          })
        case 'newest':
          return items.sort((a, b) => {
            if (a.order < b.order) {
              return -1
            }
            if (a.order > b.order) {
              return 1
            }
            return 0
          })
        case 'a to z':
          return items.sort((a, b) => {
            if (a.url < b.url) {
              return -1
            }
            if (a.url > b.url) {
              return 1
            }
            return 0
          })
        case 'status':
          return [
            ...items.filter(item => item.status === STATUS_SYNCHRONIZED),
            ...items.filter(item => item.status === STATUS_WAITING),
            ...items.filter(item => item.status === STATUS_EXIST),
            ...items.filter(item => item.status === STATUS_ERROR)
          ]
        default:
          return items
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .list-group-section {
    display: grid;
    grid-template-columns: minmax(400px, 1fr) minmax(200px, 300px) minmax(400px, 1fr);
    grid-column-gap: 16px;
  }
</style>
