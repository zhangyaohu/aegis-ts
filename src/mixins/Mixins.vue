<script lang='ts'>
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
import {getUniqueId} from '@/views/utils/utils'
import { Vue, Component } from 'vue-property-decorator'
interface Map {
  [key: string]: any
}
@Component({
  name: 'Mixins'
})
export default class Mixins extends Vue {
   @Getter('setMenuList') getMenuList: any
   @Getter('getList') getList: any
   @State(state => state.dialogController.dialogObject) dialogObject: any

   get dialogId() {
      //弹出框Id;
      let _this = this, id = '', options: any = _this.$vnode.componentOptions;
      //遍历弹出框对象得到当前弹出框的Id,注意弹出框必须写明组件名
      Object.keys(_this.dialogObject).forEach(dialogId => {
        if(dialogId.indexOf(options.Ctor.name)>= 0) {
           id = dialogId;
        }
      })
      return id;
    }

   get dialogData() {
    let _this = this;
    return _this.$store.state.dialogController.dialogObject[_this.dialogId]
  }

  @Action('updateMenuList') updateMenuList: any
  @Action('updateTableList') updateTableList: any
  @Action('updatebread') updatebread: any
  @Action('deleteBread') deleteBread: any
  @Action('openDialog') _openDialog: any
  @Action('closeDialog') closeDialog: any
  @Action('updateHeplerToolTip') updateHeplerToolTip: any
  @Action('updateSkin') updateSkin: any
  @Action('closeAllBread') closeAllBread: any

	//弹框生成器
  openDialog(className: string, param: object) {
			//默认最大垂直浮层999;
      let _this = this,
        maxZIndex = 999
			//当zIndex的值大于最大浮层时最大浮层等于该值
      for (let i in Object.keys(_this.dialogObject)) {
        if (_this.dialogObject[Object.keys(_this.dialogObject)[i]].zIndex > maxZIndex) {
          maxZIndex = _this.dialogObject[Object.keys(_this.dialogObject)[i]].zIndex
        }
      }
      let zIndex = maxZIndex + 1
      let windowId = `${className}-${getUniqueId()}`//设定弹框Id;
      return  _this._openDialog({
        id: windowId,
        parentWindowId: _this.windowId,
        zIndex: zIndex,
        className: className,
        param
      })
    }
  }
</script>
