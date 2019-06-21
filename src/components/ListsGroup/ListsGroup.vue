<template>
  <section class="list-group-section q-px-lg">
    <div class="lists-group-head-container">
      <div class="lists-group-head">
        <q-scroll-observer @scroll="onScroll" />
        <div>
          <list-controls :filters.sync="filtersOne" :selected="filteredItemsOne.length" :max="itemsOne.length"/>
          <div class="q-pt-md q-pb-sm">
            <divider></divider>
          </div>
        </div>
        <div> sync Head</div>
        <div>
          <list-controls :filters.sync="filtersTwo" :selected="filteredItemsOne.length" :max="itemsTwo.length"/>
          <div class="q-pt-md q-pb-sm">
            <divider></divider>
          </div>
        </div>
      </div>
    </div>
    <div class="lists-group-content">
      <div>

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
      <div class="text-center">
        <vue-ellipse-progress :progress="55" font-size="2rem" :animation="{type: 'rs', delay: 1000, duration: 700}">
          <span slot="legend-value">%</span>
          <q-btn round flat size="lg" color="primary" icon="sync" slot="legend-capture"/>
        </vue-ellipse-progress>
      </div>
      <div>
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
    </div>
    <div class="q-py-lg">
      <divider></divider>
    </div>
  </section>
</template>

<script>
import ListItem from './ListItem'
import ListItemsTransition from '../Transitions/ListItemsTransition'
import ListControls from './ListControls'
import Divider from '../Base/Divider'
import ScrollMixin from '../scrollObserverMixin'

const STATUS_SYNCHRONIZED = 'synchronized'
const STATUS_WAITING = 'waiting'
const STATUS_EXIST = 'exist'
const STATUS_ERROR = 'error'

export default {
  name: 'ListsGroup',
  mixins: [ScrollMixin],
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
  }
  .lists-group-head-container {
    height: 118px;
    position: relative;
  }
  .lists-group-head {
    transition: 1s;
    display: grid;
    grid-template-columns: minmax(300px, 1fr) minmax(200px, 300px) minmax(300px, 1fr);
    grid-column-gap: 16px;
    background: transparent;
    &.fixed-lists-group-head {
      padding: 0 24px;
      position: fixed;
      left: 0;
      width: 100%;
      z-index: 100;
      top: 75px;
      background: #e9f2ff;
      opacity: 1;
      & .list-controls {
        box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.1);
      }
    }
  }
  .lists-group-content {
    display: grid;
    grid-template-columns: minmax(300px, 1fr) minmax(200px, 300px) minmax(300px, 1fr);
    grid-column-gap: 16px;
  }
</style>
