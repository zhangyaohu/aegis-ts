<template>
  <div class="app-container">
    <Header></Header>
    <!--侧边菜单栏-->
    <Section-Menu :menuList="getMenuList"></Section-Menu>
    <el-scrollbar class="scrollbar__wrap">
      <div class="main-content">
        <!--上边面包屑-->
        <main-breadcrumb></main-breadcrumb>
        <span class="back-to__home">
          <span style="font-size:12px;color: #fff;">面包屑操作</span>
          <i class="el-icon-caret-bottom" style="color: #fff;"></i>
          <ul class="back-to__home___content">
            <li @click="linkTo('home')">回到首页</li>
            <li @click="linkTo('other')">关闭其他</li>
          </ul>
        </span>
        <router-view />
        <!--公司信息-->
        <div style="text-align: center;font-size:12px;">Copyright © 杭州明和科技股份有限公司 保留所有权利</div>
      </div>
    </el-scrollbar>
		<dialog-controller/>
    <!--<hepler-tooltips/> -->
  </div>
</template>
<script lang="ts">
import SectionMenu from '@/components/SectionMenu.vue'
import Header from '@/components/Header.vue'
import MainBreadcrumb from '@/components/breadcrumb/MainBreadcrumb.vue'
import { Component, Vue } from 'vue-property-decorator'
import mixins from '@/mixins/Mixins.vue'

@Component({
  name: 'Main',
  mixins: [mixins],
  components: {
    SectionMenu,
    Header,
    'main-breadcrumb': MainBreadcrumb
  }
})
export default class Main extends Vue {
   mounted() {
    let _this = this;
    //初始化打开页面更新
    if(localStorage.pageOpenedList)
    _this.updatebread(JSON.parse(localStorage.pageOpenedList));
    else
     _this.$router.push({name: 'alarm-list'});
    //跳转到最后打开的页面
    if(localStorage.lastPageObj)
    _this.$router.push({ name: JSON.parse(localStorage.lastPageObj).name });
    //设置最后打开的皮肤
    if(localStorage.theme)
    _this.updateSkin(localStorage.theme);
    else
      _this.updateSkin('default');
  }

   linkTo(param: string) {
      let _this = this;
      if(param === 'home') {
        _this.$router.push({name: 'alarm-list'})
      }
      if(param === 'other') {
        _this.closeAllBread()
         _this.$router.push({name: 'alarm-list'})
      }
    }
}
</script>
