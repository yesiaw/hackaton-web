import axios from 'axios';
import { LoginType } from '../../pages/Auth/Login/model/useLogin.ts';
import { RegisterType } from '../../pages/Auth/Registration/model/useRegister.ts';
import { requestInterceptor, responseInterceptor } from './helpers.ts';
import { PARAMS_TYPE } from './types.ts';

export const url = import.meta.env.VITE_API_URL;

export const instance = axios.create({
    baseURL: url,
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(requestInterceptor);
instance.interceptors.response.use((response) => response, responseInterceptor);

export default {
    async login(data: LoginType) {
        return instance.post('/auth/login', data).then(({ data }) => data);
    },
    async register(data: RegisterType) {
        return instance.post('/auth/register', data).then(({ data }) => data);
    },
    async getUser() {
        return instance.get('/users/me').then(({ data }) => data);
    },
    async getForecasting(params: PARAMS_TYPE) {
        console.log(params);
        return instance.get('/predictions', { params }).then(({ data }) => data);
    },
};
