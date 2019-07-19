export default {
  name: 'NotificationMixin',
  methods: {
    notifySuccess (message, avatar) {
      this.$q.notify({
        message,
        color: 'green',
        avatar,
        position: 'top-right'
      });
    },

    notifyError (message) {
      this.$q.notify({
        message,
        color: 'red',
        position: 'top-right'
      });
    }
  }
};
