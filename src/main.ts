import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import store from './store'
import element from '@/element/index.ts'
import '@/views/style/aegis-default.less'

Vue.config.productionTip = false

Vue.use(element);
export let app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
