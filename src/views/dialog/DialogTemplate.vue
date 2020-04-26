<template>
  <div class="dialog-container" ref="dialogContainer" :style="getZIndex" :class="{'draggable': draggable}">
    <div class="dialog-wrapper" :style="contentStyles">
      <div class="dialog-content" :style="_style" :key="1">
        <div class="el-dialog__header" @mousedown="handleMoveStart">
          <slot name="header"></slot>
        </div>
        <el-scrollbar class="dialog-scroller___wrapper">
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
        </el-scrollbar>
        <div class="dialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { stopBubble } from "@/views/utils/utils.ts";
import Mixins from "@/mixins/Mixins.vue";
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
interface IProp{
  left?: number | string | any;
  top?: number | string | any
}
interface DomProp {
  [key: string]: any
}
@Component({})
export default class DialogTemplate extends Vue {
  @Prop()
  width?: string | number
  @Prop()
  height?: string | number
  @Prop({default: true})
  drag?: boolean

  get getZIndex() {
      let self = this,
        containerzIndex = 0,
        el: any =  self.$refs['dialogContainer']
      if (self.isMounted)
        containerzIndex = Math.ceil(
          parseInt(el.style.zIndex)
        );
      if (containerzIndex) {
        containerzIndex = containerzIndex + 1;
      }
      return {
        "z-index": containerzIndex
      };
    }

  get  _style() {
      let self = this;
      return {
        maxHeight: self.height ? "100%" : "40vh",
        height: self.height ? "100%" : null,
        width: self.getContentWidth()
      };
    }

  get contentStyles() {
      let style: IProp = {
        left: '0px',
        top: '0px'
      };
      style.left = `${this.mouseEndPoint.left}px`;
      style.top = `${this.mouseEndPoint.top}px`;
      return style;
  }

  mounted() {
    let self = this;
    self.isMounted = true;
    debugger
    self.draggable = self.drag;
  }

  private isMounted: boolean = false
  private draggable?: boolean = true
  private mouseStartPoint: IProp = { left: 0, top: 0 }
  private mouseEndPoint: IProp = { left: 0, top: 0 }
  private mouseDragDown: boolean = false
  private basePoint: IProp = { left: 0, top: 0 }
  private moveTarget?: Element | any

  handleMoveStart(event: any) {
    var dragDom: any = document.querySelector(".el-dialog__header");
    let wrapperDom: any = document.querySelector(".dialog-wrapper");
    //阻止所选dom内容被选中
    dragDom.onselectstart = dragDom.ondrag = function() {
      return false;
    };
    if (!this.draggable) return;
    if (event.target.hasOwnProperty("close"))
      //点关闭按钮不能移动对话框
      return;
      //判断是否可以移动
      this.mouseDragDown = true;
      //移动时x轴起始位置
      this.mouseStartPoint.left = Number(
        wrapperDom.style.left.replace(/px/, "")
    );
      //移动时y轴其实位置
      this.mouseStartPoint.top = Number(
        wrapperDom.style.top.replace(/px/, "")
    );
      //移动目标
      this.moveTarget = document.querySelector(".dialog-content");
      //开始移动位置
      this.basePoint = { left: event.pageX, top: event.pageY };
      //监听移动事件
      document.addEventListener("mousemove", this.handleMoveMove, false);
      //监听鼠标up事件
      document.addEventListener("mouseup", this.handleMoveEnd, false);
      event.preventDefault();
      stopBubble(event);
  }

    handleMoveMove(event: any) {
      if (!this.mouseDragDown || this.moveTarget == undefined) return;
      //移动x轴距离
      var mousX = event.pageX - this.basePoint.left;
      //移动y轴距离
      var mousY = event.pageY - this.basePoint.top;
      //x轴距离起始位置距离
      let left = mousX + this.mouseStartPoint.left;
      //y轴距离其实位置距离
      let top = mousY + this.mouseStartPoint.top;
      //如果left， top的绝对值小于等于0证明没有发生移动
      if (Math.abs(left) <= 0 || Math.abs(top) <= 0) return;
      // offsetWidth、offsetHeight 当前元素的宽度
      // innerWidth、innerHeight 浏览器可视区的宽度和高度

      // 获取弹窗在页面中距X轴的最小、最大 位置;
      let minX =
        -(document.documentElement.clientWidth - this.moveTarget.offsetWidth) /
        2;
      let maxX =
        (document.documentElement.clientWidth - this.moveTarget.offsetWidth) /
        2;
      if (left <= minX) {
        left = minX;
      } else if (left >= maxX) {
        left = maxX;
      }
      // 获取弹窗在页面中距Y轴的最小、最大 位置
      let minY =
        -(
          document.documentElement.clientHeight - this.moveTarget.offsetHeight
        ) / 2;
      let maxY =
        (document.documentElement.clientHeight - this.moveTarget.offsetHeight) /
        2;
      if (top <= minY) {
        top = minY;
      } else if (top >= maxY) {
        top = maxY;
      }
      this.mouseEndPoint = { left: left, top: top };
      event.preventDefault();
      stopBubble(event);
    }

    handleMoveEnd(event: any) {
      this.mouseDragDown = false;
      this.moveTarget = null;
      //移除鼠标移动监听事件
      document.removeEventListener("mousemove", this.handleMoveMove);
      //移除鼠标按下事件
      document.removeEventListener("mousedown", this.handleMoveStart);
      //阻止事件默认行为
      event.preventDefault();
      //阻止事件冒泡
      stopBubble(event);
    }
    getContentWidth() {
      let self = this;
      if (typeof self.width === "string") return `${self.width}`;
      else if (typeof self.width === "number") return `${self.width}px`;
      else return "40vw";
    }
}
</script>
