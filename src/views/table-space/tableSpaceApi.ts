import HttpApi from '@/http/http';
interface IProp{
  [key: string]: any
}
let TableSpaceApi = {
	queryList: (param: IProp) => {
		return HttpApi.get('/tabspace/list', param)
		              .then((resp) => {
										return resp;
									})
	}
}

export default TableSpaceApi;
