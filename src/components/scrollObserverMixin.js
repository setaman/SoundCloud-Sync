export default {
  name: 'NotificationMixin',
  data: () => ({
    scrollInfo: {
      position: 0
    }
  }),
  computed: {
    position () {
      return this.scrollInfo.position
    }
  },
  methods: {
    onScroll (info) {
      this.scrollInfo = info
      // console.log(info)
    }
  }
}
