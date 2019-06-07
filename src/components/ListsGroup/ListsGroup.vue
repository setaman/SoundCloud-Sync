<template>
    <section class="list-group-section q-pa-lg">
      <div>
        <Container group-name="1" :get-child-payload="getChildPayload1" @drop="onDrop('items1', $event)">
          <Draggable v-for="item in items1" :key="item.id">
            <list-item/>
          </Draggable>
        </Container>
      </div>
      <div>Hello</div>
      <div>
        <Container group-name="1" behaviour="copy" :get-child-payload="getChildPayload2" @drop="onDrop('items1', $event)">
          <Draggable v-for="item in items2" :key="item.id">
            <div class="draggable-item">
              <list-item/>
            </div>
          </Draggable>
        </Container>
      </div>

    </section>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import ListItem from './ListItem'

const generateItems = (count, creator) => {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(creator(i))
  }
  return result
}

export default {
  name: 'ListsGroup',
  components: { ListItem, Container, Draggable },
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
    items1: generateItems(15, i => ({
      id: '1' + i,
      data: `Draggable 1 - ${i}`
    })),
    items2: generateItems(15, i => ({
      id: '2' + i,
      data: `Draggable 2 - ${i}`
    }))
  }),
  methods: {
    onDrop (collection, dropResult) {
      console.log(collection, dropResult)
    },
    getChildPayload1 (index) {
      return this.items1[index]
    },
    getChildPayload2 (index) {
      return this.items2[index]
    },
    getChildPayload3 (index) {
      return this.items3[index]
    },
    getChildPayload4 (index) {
      return this.items4[index]
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
