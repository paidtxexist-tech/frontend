import React, { createContext, useState, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => {
        // проверка токена в localStorage
        const saved = localStorage.getItem('authTokens');
        return saved ? JSON.parse(saved) : null;
    });

    const login = async (username, password) => {
        // вход - получение токена
        const res = await api.post('/api/token/', { username, password });
        setAuthTokens(res.data);
        localStorage.setItem('authTokens', JSON.stringify(res.data));
    };

    const register = async (username, password) => {
        // регистрация
        await api.post('/api/register/', { username, password });
    };

    const logout = () => {
        // удаление токена при выходе
        setAuthTokens(null);
        localStorage.removeItem('authTokens');
    };

    const value = { authTokens, login, register, logout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);