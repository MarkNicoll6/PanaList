import React, { createContext, useContext, useState } from 'react';
import { api } from '@/lib/api';

interface AuthContextType {
    token: string | null;
    login: (email: string) => Promise<void>;
    verify: (token: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const login = async (email: string) => {
        const res = await api.post('/auth/magic-link', { email });
        console.log('Magic Link Response:', res.data);
    };

    const verify = async (magicToken: string) => {
        const res = await api.post('/auth/verify', { token: magicToken });
        const accessToken = res.data.token;
        setToken(accessToken);
        localStorage.setItem('token', accessToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, login, verify, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
