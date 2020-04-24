import * as types from '@/store/mutation-types/index';
import { ActionContext } from 'vuex'
import Vue from 'vue';
let state = {
  hepler: {

	}
}
interface State{
  [key: string]: any
}

interface PayLoadObject{
  name: string,
  data: any
}

let actions = {
  [types.UPDATEHEPLERTOOLTIPS](context: ActionContext<State, any>, payload: PayLoadObject) {
		context.commit(types.UPDATEHEPLERTOOLTIPS, payload);
	}
}

let mutations = {
  [types.UPDATEHEPLERTOOLTIPS](state: State, payload: PayLoadObject) {
		if (!state[name]) state[name] = {}
    Vue.set(state, payload.name, {...state[payload.name], ...payload.data})
	}
}

export default{
	state,
	actions,
	mutations
}
