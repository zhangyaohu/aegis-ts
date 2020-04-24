import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
const LoginPage = () => import(/* webpackChunkName: 'LoginPage' */'@/views/login/LoginPage.vue')
const Main = () => import(/*webpackChunkName: 'MainPage'*/'@/views/Main.vue');
const AlarmPage = () => import(/*webpackChunkName: 'MainPage'*/'@/views/alarm/Alarm.vue');
const TableSpacePage = () => import(/*webpackChunkName: 'TABLESPACEPAGE'*/'@/views/table-space/TableSpacePage.vue');

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '*',
    redirect: '/alarm'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/alarm',
    name: 'Home',
    component: Main,
    children: [
      {
        path: 'alarm-list',
        name: 'alarm-list',
        component: AlarmPage,
        meta: {
          title: '告警明细列表'
        }
      },
      {
        path: 'tablespace',
        name: 'tablespace',
        component: TableSpacePage,
        meta: {
          title: '表空间预警'
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
