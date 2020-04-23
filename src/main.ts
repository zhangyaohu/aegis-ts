import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/views/style/base.less'

Vue.config.productionTip = false

export const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
