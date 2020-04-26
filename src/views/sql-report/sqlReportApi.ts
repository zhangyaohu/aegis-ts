import HttpApi from '@/http/http';
interface IProp{
  [key: string]: any
}
let SqlReportApi = {
	queryList: (param: IProp) => {
		return HttpApi.get('/sql-report/list', param)
		              .then((resp) => {
										return resp;
									})
	}
}

export default SqlReportApi;
