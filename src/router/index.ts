import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
const LoginPage = () => import(/* webpackChunkName: 'LoginPage' */'@/views/login/LoginPage.vue')
const Main = () => import(/*webpackChunkName: 'MainPage'*/'@/views/Main.vue');
const AlarmPage = () => import(/*webpackChunkName: 'MainPage'*/'@/views/alarm/Alarm.vue');
const TableSpacePage = () => import(/*webpackChunkName: 'TABLESPACEPAGE'*/'@/views/table-space/TableSpacePage.vue');
const SectionSpacePage = () => import(/*webpackChunkName: 'SECTIONSPACEPAGE'*/'@/views/section-space/SectionSpacePage.vue');
const SqlReportPage = () => import(/*webpackChunkName: 'SQLREPORTPAGE'*/'@/views/sql-report/SqlReportPage.vue');
const SqlBindPage = () => import(/*webpackChunkName: 'SQLBINDPAGE'*/'@/views/sql-bind/SqlBindPage.vue');
const TrendMetricPage = () => import(/*webpackChunkName: 'TRENDMETRICPAGE'*/'@/views/oracle/tric-metric/TrendMetricPage.vue');
const UserManagerPage = () => import(/*webpackChunkName: 'USERMANAGERPAGE'*/'@/views/config/user/UserManagerPage.vue');

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
      {
        path: 'section-space',
        name: 'section-space',
        component: SectionSpacePage,
        meta: {
          title: '段空间预警'
        }
      },
      {
        path: 'sql-report',
        name: 'sql-report',
        component: SqlReportPage,
        meta: {
          title: 'SQL区段报表'
        }
      },
      {
        path: 'sql-bind',
        name: 'sql-bind',
        component: SqlBindPage,
        meta: {
          title: 'SQL区段绑定变量'
        }
      },
      {
        path: 'trend-list',
        name: 'trend-list',
        component: AlarmPage,
        meta: {
          title: '趋势图预警'
        }
      },
    ]
  },
  {
    path: '/oracle',
    name: 'oracle',
    component: Main,
    children: [
      {
        path: 'trend-metric',
        name: 'trend-metric',
        component: TrendMetricPage,
        meta: {
          title: '关键指标趋势'
        }
      }]
  },
  {
    path: '/config',
    name: 'config',
    component: Main,
    children: [
      {
        path: 'user-manager',
        name: 'user-manager',
        component: UserManagerPage,
        meta: {
          title: '用户管理'
        }
      }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
