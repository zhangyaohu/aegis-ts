import HttpApi from '@/http/http';
interface IProp{
  [key: string]: any
}
const TrendMetricHttpApi = {
	queryMetric: (param: IProp) => {
		return HttpApi.get('/curves/dispbyh',param)
		       .then((resp) => {
             return resp;
					 });
	}
}

export default TrendMetricHttpApi;
