import Http from '@/http/http';
interface IProp{
  [key: string]: any
}
let UserManagerApi = {
	queryList: (param: IProp) => {
		return Http.get('/config/user/list', param)
			.then((resp) => {
				return resp;
			})
	},
	queryRoleList: (param: IProp) => {
		return Http.get('/config/user/role/list', param)
			.then((resp) => {
				return resp;
			})
	},
	modifyUser: (param: IProp) => {
		return Http.post('/modifyUser', param)
			.then((resp) => {
				return Promise.resolve(resp);
			})
	},
	modifyPwd:(param: IProp) => {
		return Http.post('/modifyPwd', param)
		.then((resp) => {
			return Promise.resolve(resp);
		})
	}
}

export default UserManagerApi;
