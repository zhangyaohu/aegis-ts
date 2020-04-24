<template>
  <div
    class="bread-container"
    ref="scrollCon"
    @DOMMouseScroll="handlescroll"
    @mousewheel="handlescroll"
  >
    <div class="bread-content" ref="scrollBody" :style="{left: tagBodyLeft + 'px'}">
      <div
        class="bread-item"
        v-for="(item,index) in tagsList"
        ref="tagsPageOpened"
        @click="linkTo(item)"
        :key="index"
      >
        <span class="bread-item__dot" :class="{'is-active': item.name === $route.name}" />
        <span class="bread-item__title">{{`${breadTitle[item.name]}`}}</span>
        <i class="bread-item__close el-icon-close" @click="close($event,item.name)"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Mixins from '@/mixins/Mixins.vue'
import { stopBubble } from '@/views/utils/utils'
import breadTitleArr from '@/components/breadcrumb/breadTitle.ts'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
interface Map {
  [key: string]: string
}

@Component({
  name: 'MainBreadcrumb',
  mixins: [Mixins]
})
export default class MainBreadcrumb extends Vue {

  currentPageName: any
  tagBodyLeft: number = 0
  refsTag: any
  tagsCount: number = 1
  breadTitle: Map = breadTitleArr

  get tagsList(): Array<any> {
    let _this = this;
    debugger
    return _this.$store.state.menu.breadList;
  }

  mounted() {
    let _this = this;
    _this.currentPageName = _this.$route.name;
    //获得tag的dom
    _this.refsTag = _this.$refs.tagsPageOpened;
    setTimeout(() => {
      _this.refsTag.forEach((item: any, index: number) => {
        //当跳转的路由name等于dom name时则移动到次tag下
        if (
          _this.breadTitle[`${_this.$route['name']}`] && _this.breadTitle[`${_this.$route['name']}`].trim() === item.textContent.trim()
        ) {
          let tag = _this.refsTag[index];
          _this.moveToView(tag);
        }
      });
    }, 1); // 这里不设定时器就会有偏移bug
    _this.tagsCount = _this.tagsList.length;
  }

    close(event: any, name: string) {
      stopBubble(event);
      let _this = this;
      if (name === "alarm-list") return;
      let pageOpenedList = _this.$store.state.menu.breadList;
      let lastPageObj = pageOpenedList[0];
      if (_this.currentPageName === name) {
        let len = pageOpenedList.length;
        for (let i = 1; i < len; i++) {
          if (pageOpenedList[i].name === name) {
            if (i < len - 1) {
              lastPageObj = pageOpenedList[i + 1];
            } else {
              lastPageObj = pageOpenedList[i - 1];
            }
            break;
          }
        }
      } else {
        let tagWidth = event.target.parentNode.offsetWidth;
        this.tagBodyLeft = Math.min(_this.tagBodyLeft + tagWidth, 0);
      }
      _this.deleteBread({ name: name });
      pageOpenedList = _this.$store.state.menu.breadList;
      localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
      if (this.currentPageName === name) {
        this.linkTo(lastPageObj);
      }
    }
    linkTo(item: Map) {
      let routerObj: Map = {};
      routerObj.name = item.name;
      if (item.params) {
        routerObj.params = item.params;
      }
      if (item.query) {
        routerObj.query = item.query;
      }
      this.$router.push(routerObj);
      localStorage.lastPageObj = JSON.stringify(routerObj);
    }
    handlescroll(e: any) {
      let type = e.type,
        delta = 0,
        _this = this,
        refs: any = _this.$refs
      if (type === "DOMMouseScroll" || type === "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      let left = 0;
      if (delta > 0) {
        left = Math.min(0, _this.tagBodyLeft + delta);
      } else {
        if (
          refs.scrollCon.offsetWidth - 100 <
          refs.scrollBody.offsetWidth
        ) {
          if (
            _this.tagBodyLeft <
            -(
              refs.scrollBody.offsetWidth -
              refs.scrollCon.offsetWidth +
              100
            )
          ) {
            left = _this.tagBodyLeft;
          } else {
            left = Math.max(
              _this.tagBodyLeft + delta,
              refs.scrollCon.offsetWidth -
                refs.scrollBody.offsetWidth -
                100
            );
          }
        } else {
          _this.tagBodyLeft = 0;
        }
      }
      _this.tagBodyLeft = left;
      stopBubble(e);
    }
    moveToView(tag: any) {
      let _this = this,
      refs: any = _this.$refs;
      //当标签偏离左边的距离小于
      if (tag.offsetLeft < -_this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + 10;
      } else if (
        tag.offsetLeft + 10 > -_this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth <
          -_this.tagBodyLeft + refs.scrollCon.offsetWidth - 100
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          refs.scrollCon.offsetWidth -
            100 -
            tag.offsetWidth -
            tag.offsetLeft -
            20
        );
      } else {
        // 标签在可视区域右侧
        _this.tagBodyLeft = -(
          tag.offsetLeft -
          (refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) +
          20
        );
      }
    }

  @Watch('$route')
    function(to: Map) {
      let _this = this;
      _this.currentPageName = to.name;
      //路由发生变化时更新面包屑
      _this.updatebread({
        name: to.name,
        path: to.path,
        params: to.params,
        query: to.query
      });
      //更新最后跳转的路由
      localStorage.lastPageObj = JSON.stringify({
        name: to.name,
        path: to.path,
        params: to.params,
        query: to.query
      });
      _this.$nextTick(() => {
        _this.refsTag.forEach((item: Map, index: number) => {
          //当跳转路由等于点击dom的textContent则移动到这个dom
          if (_this.breadTitle[to.name].trim() === item.textContent.trim()) {
            let tag = _this.refsTag[index];
            _this.moveToView(tag);
          }
        });
      });
      //计算标签总数
      _this.tagsCount = _this.tagsList.length;
    }
}
</script>
