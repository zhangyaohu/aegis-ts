import axios from 'axios';
import { app } from '@/main.ts';
import { getUniqueId } from '@/views/utils/utils.ts';

interface Map {
  [key: string]: any
}
axios.defaults.withCredentials = true;
let config: object = {
	baseURL: '/api',
	transformRequest: [
		function (data: Map) {
			let ret = '';
			for (let it in data) {
				ret += it + '=' + data[it] + '&'
			}
			console.log(ret);
			return ret;
		}
	],
	transformResponse: [
		function (data: any) {
			return data
		}
	],
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
	},
	timeout: 10000,
	responseType: 'json',
};

axios.interceptors.request.use((config) => {
	return config;
})
axios.interceptors.response.use((res): any => {
	if (res.data && res.data.status && res.data.status === 500) {
		return Promise.reject(IEVersion() !== -1 ? JSON.parse(res.data) : res.data);
	} else if (res.data && res.data.status && res.data.status === 200) {
		return Promise.resolve(IEVersion() !== -1 ? JSON.parse(res.data) : res.data)
	} else if (res.data && res.data.status && res.data.status === 401) {

	} else {
		return Promise.resolve(IEVersion() !== -1 ? JSON.parse(res.data) : res.data);
	}
}, (error: any) => {
	if (error.response.status === 401) {
		app.$store.commit('openDialog', {
			className: 'ConfirmDlg',
			zIndex: 9999,
			id: `ConfirmDlg-${getUniqueId()}`,
			param: {
				content: '用户登录已过期,请重新登录',
				icon: 'el-icon-info',
				ok: () => {
					app.$store.commit('close');
					app.$router.push({ name: 'login' });
				}
			}
		});
	}
	if (/^[5][0-9][0-9]$/.test(String(error.response.status))) {
    app.$notify( {
      title: '提示',
      type: 'error',
      message: '用户名或者密码错误!'
    } )
	}
	console.log(error);
	if(/^[4][0-9][0-9]$/.test(String(error.response.status))) {
    app.$notify( {
      title: '提示',
      type: 'error',
      message: '用户名或者密码错误!'
    } )
	}
	return Promise.reject(error.response.data);
})

function IEVersion() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
	var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
	var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
	if (isIE) {
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if (fIEVersion == 7) {
			return 7;
		} else if (fIEVersion == 8) {
			return 8;
		} else if (fIEVersion == 9) {
			return 9;
		} else if (fIEVersion == 10) {
			return 10;
		} else {
			return 6;//IE版本<=7
		}
	} else if (isEdge) {
		return 'edge';//edge
	} else if (isIE11) {
		return 11; //IE11
	} else {
		return -1;//不是ie浏览器
	}
}

let HttpAPI = {
	get(url: string, params: object) {
		return axios.get(url, Object.assign({}, config, { params }))
	},

	post(url: string, params: object) {
		return axios.post(url, params, config)
	},

	put(url: string, params: object) {
		return axios.put(url, params, config)
	},

	delete(url: string, params: object) {
		return axios.delete(url, Object.assign({}, config, { params }))
	},

	upload(url: string, params: object) {
		return axios.post(url, params, config)
	}
};

export default HttpAPI;
