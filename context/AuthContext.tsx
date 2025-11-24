
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (login: string, pass: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (login: string, pass: string): boolean => {
        const foundUser = mockUsers.find(u => u.login === login && u.passwordHash === pass);
        if (foundUser) {
            setUser(foundUser);
            // In a real app, this token would come from a server.
            const generatedToken = `demo_token_${foundUser.userId}_${Date.now()}`;
            setToken(generatedToken);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
