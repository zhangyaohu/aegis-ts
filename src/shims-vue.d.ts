import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import { Notification } from 'element-ui'
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
import { Store } from 'vuex'
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $store: Store<any>;
    // 以下是在main.ts中挂载到Vue.prototype上的变量
    $mock: any;
  }
}
