import Vue from 'vue';
import ViewUI from 'view-design';
import App from './App.vue';
import router from './router';
import store from './store';
import 'view-design/dist/styles/iview.css';


Vue.use(ViewUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// window.addEventListener('hashchange', () => {
//   console.log('sadsdasdasdasdasda');
// });
