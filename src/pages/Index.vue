<template>
  <q-page>
    <div class="row">
      <div class="col-6">
        <h1>Hello</h1>
      </div>
      <div class="col-6">
        <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
      </div>
      <div class="col-12">
        <h2 v-for="n in 15" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
        </h2>
      </div>
    </div>
    <q-page-sticky expand position="top">
      <q-toolbar class="bg-accent text-white">
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
        </q-avatar>
        <q-toolbar-title>
          Page Title
        </q-toolbar-title>
      </q-toolbar>
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
<style lang="scss" scoped>
  h1 {
    background: red;
  }
</style>
