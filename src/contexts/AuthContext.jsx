import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in from localStorage
        const savedUser = localStorage.getItem('context_os_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock authentication - in production, this would call an API
        const mockUser = {
            id: Date.now(),
            email: email,
            name: email.split('@')[0],
            loginAt: new Date().toISOString()
        };

        setUser(mockUser);
        localStorage.setItem('context_os_user', JSON.stringify(mockUser));
        return Promise.resolve(mockUser);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('context_os_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
