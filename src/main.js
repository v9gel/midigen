import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Storage from 'vue-web-storage';
import store from './store'
import locale from 'element-ui/lib/locale/lang/ru-RU'
Vue.config.productionTip = false;

Vue.use(ElementUI, {locale});
Vue.use(Storage, {
  prefix: 'your_app_slug_',// default `app_`
  drivers: ['session','local'], // default 'local'
});

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
