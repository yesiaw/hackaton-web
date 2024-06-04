export const getToken = function getToken() {
    return localStorage.getItem('token');
};

const getRefreshToken = function getRefreshToken() {
    return localStorage.getItem('refreshToken');
};

const setToken = function setToken(token: string) {
    localStorage.setItem('token', token);
};

const setRefreshToken = function setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
};

const requestInterceptor = (config: any) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
};
