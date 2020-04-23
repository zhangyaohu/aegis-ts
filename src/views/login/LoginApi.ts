import Http from '@/http/http';

const LoginHttpApi = {
	login: (param: object) => {
		return Http.post('/login',param)
		       .then((resp) => {
             return resp;
					 });
	}
}

export default LoginHttpApi;
