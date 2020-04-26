<template>
	  <dialog-template>
    <template slot="header">
      <span class="title">修改密码</span>
      <span class="model-close el-icon-close" @click="close"></span>
    </template>
    <template slot="body">
      <div class="dialog-body" style="padding: 30px 50px">
        <!-- <mh-input
          label="旧密码"
          inputClass="input_300"
          v-model="oldPassword"
					type="password"
          placeholder="请输入旧密码"
          :show-error="emptyoldPassword || invalidoldPassword"
          props="oldPassword"
          @validate="validate('oldPassword')"
          :error-message="rules.oldPassword.message"
        /> -->

        <mh-input
          label="新密码"
          inputClass="input_300"
          v-model="password"
					type="password"
          placeholder="请输入密码"
          :show-error="emptypassword || invalidpassword"
          props="password"
          @validate="validate('password')"
          :error-message="rules.password.message"
        />

        <mh-input
          label="确认密码"
          inputClass="input_300"
          v-model="confirmPwd"
					type="password"
          placeholder="请输入密码"
          :show-error="emptyconfirmPwd || invalidconfirmPwd"
          props="confirmPwd"
          @validate="validate('confirmPwd')"
          :error-message="rules.confirmPwd.message"
        />

      </div>
    </template>
    <template slot="footer">
      <span class="btn-confirm" @click="submit()">提交</span>
      <span class="btn-cancel" @click="close()">取消</span>
    </template>
  </dialog-template>
</template>

<script lang="ts">
import Mixins from '@/mixins/Mixins.vue';
import DialogTemplate from '@/views/dialog/DialogTemplate.vue';
import { isPhoneNumber, isEmail} from '@/views/utils/utils';
import { Component, Vue } from 'vue-property-decorator'
interface IProp{
  [key: string]: any
}
@Component({
  name: 'ModifyPwdDlg',
  mixins: [Mixins],
	components: {
		DialogTemplate
	}
})
export default class ModifyPwdDlg extends Vue {
		private oldPassword: string = ''
		private password: string = ''
		private confirmPwd: string = ''
		private emptyoldPassword: boolean = false
		private invalidoldPassword: boolean = false
		private emptypassword: boolean = false
		private invalidpassword: boolean = false
		private emptyconfirmPwd: boolean = false
		private invalidconfirmPwd: boolean = false
		private rules: IProp = {
				oldPassword: {
					message: ''
				},
				password: {
					message: ''
				},
				confirmPwd: {
					message: ''
				}
			}

		//关闭弹框
		close(): void {
      let _this = this;
      console.log(_this.dialogId);
			_this.closeDialog(_this.dialogId);
    }

		validate(prop: string): void {
			let _this = this, input = '';
			input = String(_this[prop]).trim();
			_this[`empty${prop}`] = false;
			if(/^\s*$/.test(input)){
				_this[`empty${prop}`] = true;
				_this.rules[prop].message = '不能为空!';
				return;
			}
			_this[`invalid${prop}`] = false;
			if(prop === 'oldPassword' && _this[prop] !== _this.dialogData.param.param.password) {
					_this[`invalid${prop}`] = true;
					_this.rules[prop].message = '旧密码输入错误!';
				  return;
			}
			if(prop === 'password' && (_this[prop].length>30 || _this[prop].length < 6)) {
					_this[`invalid${prop}`] = true;
					_this.rules[prop].message = '新密码输入错误!';
				  return;
			}
				if(prop === 'confirmPwd' && _this[prop] !== _this.password) {
					_this[`invalid${prop}`] = true;
					_this.rules[prop].message = '两次输入密码不一致!';
				  return;
			}
		}
		validateAll() {
			let _this = this, props = ['password', 'confirmPwd'];
			props.forEach(prop => _this.validate(prop));
			let invalid = props.some(prop => _this[`empty${prop}`] === true || _this[`invalid${prop}`] === true);
			return invalid;
		}
		modifyUserParam(): IProp {
			let _this = this;
			return {
				password: _this.password,
				// oldPassword: _this.oldPassword
				username: _this.dialogData.param.param.username
			}
		}
		submit(): void {
			let _this = this;
			if(_this.validateAll()) return;
			_this.dialogData.param.ok(_this.modifyUserParam())
			     .then(() => {
						 _this.close();
					 })
		}
}
</script>
