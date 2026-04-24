import axios from 'axios';

const api = axios.create({
    // бэк
    baseURL: 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
    // держит авторизацию
    const tokens = JSON.parse(localStorage.getItem('authTokens'));
    if (tokens) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
});

export default api;