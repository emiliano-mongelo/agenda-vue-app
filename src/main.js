import 'tachyons';
import 'vue-material/dist/vue-material.min.css'
import Vue from 'vue';
import Vuex from "vuex";
import VueI18n from 'vue-i18n';
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import router from './router';
import { state, actions, mutations } from './store';
import App from './components/App.vue';
import * as locales from './translations';

Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(VueMaterial);

const store = new Vuex.Store({
  state,
  mutations,
  actions
});

const i18n = new VueI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages: locales
});

const app = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
