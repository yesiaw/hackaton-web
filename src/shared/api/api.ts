import axios from 'axios';
import { LoginType } from '../../pages/Auth/Login/model/useLogin.ts';
import { RegisterType } from '../../pages/Auth/Registration/model/useRegister.ts';
import { requestInterceptor } from './helpers.ts';

export const URL = 'http://87.242.103.153:8000/api/v1';

const api = axios.create({
    baseURL: URL,
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(requestInterceptor);

export default {
    async login(data: LoginType) {
        return api.post('/auth/login', data).then(({ data }) => data);
    },
    async register(data: RegisterType) {
        return api.post('/auth/register', data).then(({ data }) => data);
    },
    async getUser() {
        return api.get('/users/me').then(({ data }) => data);
    },
};
