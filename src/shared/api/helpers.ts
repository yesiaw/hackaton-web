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
