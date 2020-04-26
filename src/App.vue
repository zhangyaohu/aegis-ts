<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PageTemplate from '@/components/PageTemplate.vue'
import Table from '@/components/table/Table.vue'
import Input from '@/components/input.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import DialogController from '@/views/dialog/Controller.vue';
Vue.component("dialog-controller", DialogController)
Vue.component('page-template', PageTemplate)
Vue.component('mh-table', Table)
Vue.component('mh-input', Input)
Vue.component('pagination', Pagination)
@Component
export default class App extends Vue {

}
</script>

<style lang="less">
 #app{
   width: 100%;
   height: 100%;
 }
</style>
