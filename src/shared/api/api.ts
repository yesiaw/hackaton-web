import axios from 'axios';
import { LoginType } from '../../pages/Auth/Login/model/useLogin.ts';
import { RegisterType } from '../../pages/Auth/Registration/model/useRegister.ts';
import { requestInterceptor, responseInterceptor } from './helpers.ts';

export const url = 'http://87.242.103.153:8000/api/v1';

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
};
