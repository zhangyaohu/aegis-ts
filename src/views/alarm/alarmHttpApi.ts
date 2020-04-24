import HttpApi from '@/http/http';
interface IProp {
  [key: string]: any
}

const AlarmHttpApi = {
	queryList: (param:IProp) => {
		return HttpApi.get('/alarm/list',param)
		       .then((resp) => {
             return resp;
					 });
	}
}

export default AlarmHttpApi;
