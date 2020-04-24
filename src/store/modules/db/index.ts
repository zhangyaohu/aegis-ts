import * as types from '@/store/mutation-types/index'
import Vue from 'vue';
import { ActionContext } from 'vuex'
let state = {
	'alarm': [],
	'tableSpace': [],
	'sqlReport': [],
	'sqlBind': [],
	'sessionHistory': [],
	'awrShapshot': [],
	'sqlQuote': [],
	'sqlSummaryRpt':[],
	'sqlNoBind': [],
	'quoteReport': [],
	'orderReport': [],
	'dataDictionary': [],
	'tableSpaceReport': [],
	'sectionSpaceReport': [],
	'user': [],
	'role': [],
	'roleManager': [],
	'hostManager': [],
	'hostGroup': [],
	'templateManager': [],
	'exceptManager': [],
	'rank':[],
	'tableHistory': [],
	'sectionSpaceHistory': [],
	'hostTemplate': [],
	'hostList': [],
	'quoteReportHistory': [],
	'orderReportHistory': [],
	'recordChangeHistory': []
}

interface State{
  [key: string]: Array<any>
}

interface TableObject{
  tableName: string,
  list: Array<any>
}
let actions = {
  [types.UPDATETABLELIST](context: ActionContext<State, any>, payload: TableObject) {
		context.commit(types.UPDATETABLELIST, payload);
	}
}

let mutations = {
   [types.UPDATETABLELIST](state: State, payload: TableObject){
		if (!state[payload['tableName']]) state[payload['tableName']] = []
    Vue.set(state, payload['tableName'], [...payload['list']])
	}
}

// let getters = {
// 	getList: (tableName: any): any => state[tableName];
// }

export default {
	state,
	actions,
	mutations
}
