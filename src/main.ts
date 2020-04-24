import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import store from './store'
import element from '@/element/index.ts'
import '@/views/style/aegis-default.less'

Vue.config.productionTip = false

Vue.use(element);
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
