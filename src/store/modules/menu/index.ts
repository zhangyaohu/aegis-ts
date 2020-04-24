import * as types from '@/store/mutation-types/index'
import { ActionContext } from 'vuex'
import _ from 'lodash';
import Vue from 'vue';
let state = {
	menuList: [],
	flag: false,//标记是否为第一次进入主页面,
	skin: '',
	breadList: [
		{
			name: "alarm-list",
			path: "/alarm/alarm-list",
			params: {},
			query: {}
		}
	]
}
interface State{
  [key: string]: any
}

interface Map {
  [key: string]: any
}
let actions = {
	[types.UPDATEMENULIST](context: ActionContext<State, any>, payload: Map) {
		context.commit(types.UPDATEMENULIST, payload);
	},
	[types.UPDATEBREAD](context: ActionContext<State, any>, payload: Map) {
		context.commit(types.UPDATEBREAD, payload);
	},
	[types.DELETEBREAD](context: ActionContext<State, any>, payload: Map) {
		context.commit(types.DELETEBREAD, payload);
	},
	[types.UPDATESKIN](context: ActionContext<State, any>, payload: Map) {
		context.commit(types.UPDATESKIN, payload);
	},
	[types.CLOSEALLBREAD](context: ActionContext<State, any>, payload: Map) {
		context.commit(types.CLOSEALLBREAD)
	}
}

let mutations = {
	[types.UPDATEMENULIST](state: State, payload: Array<any>) {
		state.menuList = [];
		Vue.set(state, 'menuList', [...payload]);
	},
	[types.UPDATEBREAD](state: State, payload: Map) {
		 let newState = [];
		 if(_.isArray(payload))
		   Vue.set(state, 'breadList',[...state.breadList, ...payload]);
		 else
		   Vue.set(state, 'breadList',[...state.breadList, payload])
		 for(let i in state.breadList) {
			 if(JSON.stringify(newState).indexOf(JSON.stringify(state.breadList[i])) === -1){
				newState.push(state.breadList[i]);
			 }
		 }
		 Vue.set(state, 'breadList',[...newState]);
		 localStorage.pageOpenedList = JSON.stringify([...state.breadList]);
	},
	[types.DELETEBREAD](state: State, payload: Map) {
		let newState: Array<any> = [];
		state.breadList.forEach((item: Map) => {
			if (item.name !== payload.name) {
				newState.push(item);
			}
		})
		Vue.set(state, 'breadList', [...newState]);
	},
	[types.UPDATESKIN](state: State, payload: any) {
		Vue.set(state, 'skin', payload);
	},
	[types.CLOSEALLBREAD](state: State) {
		Vue.set(state, 'breadList', [{
			name: "alarm-list",
			path: "/alarm/alarm-list",
			params: {},
			query: {}
		}]);
		localStorage.pageOpenedList = [];
	}
}

let getters = {
	setMenuList() {
		return state.menuList;
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
