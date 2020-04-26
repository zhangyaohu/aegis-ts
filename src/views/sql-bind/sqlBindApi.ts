import HttpApi from '@/http/http';
interface IProp{
  [key: string]: any
}

let SqlBindApi = {
	queryList: (param: IProp) => {
		return HttpApi.get('/sql-bind/list', param)
		              .then((resp) => {
										return resp;
									})
	}
}

export default SqlBindApi;
