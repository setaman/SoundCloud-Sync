import VueEllipseProgress from 'vue-ellipse-progress';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';

export default ({ Vue, store }) => {
  Vue.use(VueEllipseProgress);
  Vue.use(VueSocketio, io({
    autoConnect: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000
  }));
};
