<template>
	<div>
		  <component :key="dlg.windowId" v-for="(dlg, index) in dialogList" :class="{ 'legacy-dialog-panel': !(index === dialogList.length - 1) }" :is="dlg.class" :assigned-id="dlg.windowId" :param="dlg.param" :style="{ 'z-index': dlg.zIndex }"/>
	</div>
</template>

<script lang="ts">
interface IProp {
  [key: string]: any
}
var dialogClass: IProp = {};
// import HandleAlarmDlg from '@/views/dialog/alarm/HandleAlarmDlg';
import ConfirmDlg from '@/views/dialog/confirmDlg/ConfirmDlg.vue';
import ModifyUserDlg from '@/views/dialog/user/ModifyUserDlg.vue';
import ModifyPwdDlg from '@/views/dialog/user/ModifyPwdDlg.vue';
dialogClass.ConfirmDlg = ConfirmDlg;
dialogClass.ModifyPwdDlg = ModifyPwdDlg;
dialogClass.ModifyUserDlg = ModifyUserDlg;
// dialogClass.HandleAlarmDlg = HandleAlarmDlg;
import { Component, Vue } from  'vue-property-decorator'

@Component
export default class Controller extends Vue {
  get dialogList () {
    let _this = this, list: Array<any> = [];
    debugger
    _this.$store.state.dialogController.dialogIdList.forEach((windowId: string) => {
        list.push({
            windowId,
            class: dialogClass[_this.$store.state.dialogController.dialogObject[windowId].className],
            param: _this.$store.state.dialogController.dialogObject[windowId].param.windowParam,
            zIndex: _this.$store.state.dialogController.dialogObject[windowId].zIndex
          })
      });
      return list
  }
}
</script>
