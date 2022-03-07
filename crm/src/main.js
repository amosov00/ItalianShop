import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
require('./assets/App.css')
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import "vue-wysiwyg/dist/vueWysiwyg.css";
import moment from 'moment'
import localization from 'moment/locale/ru';
import wysiwyg from "vue-wysiwyg";

Vue.use(wysiwyg, {}); // config is optional. more below
moment.locale('ru', localization);
Vue.use(Toast);
Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
