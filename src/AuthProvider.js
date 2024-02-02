import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [name, setName] = useState(localStorage.getItem('name'));

    const isAuthenticated = () => {
        return localStorage.getItem('isAuthenticated') === 'true';
    };

    const login = (id, name) => {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', id);
        localStorage.setItem('name', name);
        setUserId(id);
        setName(name);
    };

    const logout = () => {
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        setUserId(null);
        setName(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: isAuthenticated(), login, logout, userId, name }}>
            {children}
        </AuthContext.Provider>
    );
};
