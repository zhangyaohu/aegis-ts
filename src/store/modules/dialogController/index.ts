import * as types from '@/store/mutation-types';
import { ActionContext } from 'vuex'
import Vue from 'vue';
let state = {
  dialogObject: {

	},
	dialogIdList: []
}

interface State{
  [key: string]: any
}

interface Map {
  [key: string]: any
}
let actions = {
  [types.OPENDIALOG](context: ActionContext<State, any>, payload: Map) {
		return new Promise((resolve, reject) => {
			context.commit(types.OPENDIALOG, payload);
			resolve(payload.id);
		})
	},
	[types.CLOSEDIALOG](context: ActionContext<State, any>, payload: Map) {
		return new Promise((resolve, reject) => {
			context.commit(types.CLOSEDIALOG, payload);
		})
	},
	[types.CLOSE](context: ActionContext<State, any>, payload: Map) {
		return new Promise((resolve, reject) => {
			context.commit(types.CLOSE, payload);
		})
	}
}

let mutations = {
  [types.OPENDIALOG](state: State, payload: Map) {
		 Vue.set(state, 'dialogObject', {...state.dialogObject, [payload.id]: payload});
		 state.dialogIdList.push(payload.id);
	},
	[types.CLOSEDIALOG](state: State, id: string) {
		if (state.dialogIdList.indexOf(id) <= -1) return
    state.dialogIdList = state.dialogIdList.filter((uuid: any) => uuid !== id)
    delete state.dialogObject[id]
	},
	[types.CLOSE](state: State, payload: Map) {
		state.dialogIdList.forEach((id: string) => {
			delete state.dialogObject[id];
		})
		Vue.set(state, 'dialogIdList', []);
	}
}

export default {
	state,
	actions,
	mutations
}
