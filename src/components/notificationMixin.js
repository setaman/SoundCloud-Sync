export default {
  name: 'NotificationMixin',
  methods: {
    notifySuccess (message, avatar) {
      this.$q.notify({
        message,
        color: 'green',
        avatar,
        position: 'top-right',
        classes: 'notification success'
      });
    },

    notifyError (message) {
      this.$q.notify({
        message,
        color: 'red',
        position: 'top-right',
        classes: 'notification error'
      });
    },
    notifyWarn (message) {
      this.$q.notify({
        timeout: 0,
        message,
        color: 'orange',
        position: 'top-right',
        classes: 'notification warn'
      });
    }
  }
};
