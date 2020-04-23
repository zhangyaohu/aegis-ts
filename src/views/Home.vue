<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" ref="img">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script type="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  HelloWorld
})
export default class Home extends Vue {
  // @Provide('users')
  // users = [
  //   {
  //     name: 'test',
  //     id: 0
  //   }
  // ]
}
</script>
