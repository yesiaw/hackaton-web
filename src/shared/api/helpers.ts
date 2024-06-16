import axios from 'axios';
import { instance, url } from './api.ts';

export const getToken = function getToken() {
    return localStorage.getItem('token');
};

export const getRefreshToken = function getRefreshToken() {
    return localStorage.getItem('refreshToken');
};

export const setTokenToStorage = function setTokenToStorage(token: string) {
    localStorage.setItem('token', token);
};

export const setRefreshTokenToStorage = function setRefreshTokenToStorage(token: string) {
    localStorage.setItem('refreshToken', token);
};

export const requestInterceptor = (config: any) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    location.reload();
};

export const responseInterceptor = async (error: any) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            logout();
            return;
        }
        return axios
            .post(`${url}/auth/refresh_token`, {
                refresh_token: refreshToken,
            })
            .then((res) => {
                setTokenToStorage(res.data.access_token);
                setRefreshTokenToStorage(res.data.refresh_token);
                return instance.request(originalRequest);
            })
            .catch(() => {
                logout();
            });
    }
    return Promise.reject(error);
};
