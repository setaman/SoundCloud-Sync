export default {
  name: 'NotificationMixin',
  data: () => ({
    position: 0
  }),
  methods: {
    onScroll (info) {
      this.position = info;
    }
  }
};
