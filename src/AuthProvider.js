import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const name = localStorage.getItem('name');
        const privilage = localStorage.getItem('privilage');
        if (userId && name && privilage) {
            setUser({ userId, name, privilage });
        }
    }, []);

    const isAuthenticated = () => {
        return localStorage.getItem('isAuthenticated') === 'true';
    };

    const login = (id, name, privilage) => {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', id);
        localStorage.setItem('name', name);
        localStorage.setItem('privilage', privilage);
        setUser({ userId: id, name, privilage });
    };

    const logout = () => {
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('privilage');
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: isAuthenticated(), login, logout, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
