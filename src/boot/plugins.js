import VueEllipseProgress from 'vue-ellipse-progress';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';

export default ({ Vue, store }) => {
  Vue.use(VueEllipseProgress);
  Vue.use(VueSocketio, io('http://localhost:3000', { store }));
};
