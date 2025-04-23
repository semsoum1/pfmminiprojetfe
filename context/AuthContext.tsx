import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '@/app/api';

interface AuthContextType {
    userToken: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    userToken: null,
    login: async () => {},
    logout: async () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userToken, setUserToken] = useState<string | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) setUserToken(token);
        };
        loadToken();
    }, []);

    const login = async (username: string, password: string) => {
        const res = await loginUser(username, password);
        if (res?.token) {
            await AsyncStorage.setItem('token', res.token);
            setUserToken(res.token);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUserToken(null);
    };

    return (
        <AuthContext.Provider value={{ userToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
