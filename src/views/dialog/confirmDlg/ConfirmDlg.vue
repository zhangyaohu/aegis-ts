<template>
  <dialog-template :width="400" :drag="false">
    <template slot="header">
       <span class="title">确定</span>
			 <span class="model-close el-icon-close" @click="close"></span>
		</template>
		<template slot="body">
			<div style="padding: 50px 0px; text-align: center;">
				<i style="font-size: 16px;" :class="dialogData.param.icon ? dialogData.param.icon : ''"></i>
         {{dialogData.param.content}}
			</div>
		</template>
		<template slot="footer">
		   <span class="btn-confirm" @click="submit()">确定</span>
			 <span class="btn-cancel" @click="close()">取消</span>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import DialogTemplate from '@/views/dialog/DialogTemplate.vue';
import Mixins from '@/mixins/Mixins.vue';
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: "ConfirmDlg",
	mixins: [Mixins],
	components: {
		DialogTemplate
	}
})
export default class ConfirmDlg extends Vue {
		close(): void {
			let _this = this;
			_this.closeDialog(_this.dialogId);
		}
		submit(): void {
			let  _this = this;
			_this.dialogData.param.ok();
			_this.close();
		}
}
</script>

<style lang="less" scoped>

</style>
