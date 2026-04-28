import axios from 'axios';


const api = axios.create({
    // адрес обращения на бэк
    baseURL: `http://${window.location.hostname}:8000`,
});

api.interceptors.request.use((config) => {
    // держит авторизацию
    const tokens = JSON.parse(localStorage.getItem('authTokens'));
    if (tokens) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // если 401 редиректит удаляет токен и редирект на вход
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authTokens');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


export default api;