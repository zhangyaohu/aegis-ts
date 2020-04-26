import HttpApi from '@/http/http';
interface IProp{
  [key: string]: any
}
let sectionSpaceApi = {
	queryList: (param: IProp) => {
		return HttpApi.get('/segspace/list', param)
		              .then((resp) => {
										return resp;
									})
	}
}

export default sectionSpaceApi;
