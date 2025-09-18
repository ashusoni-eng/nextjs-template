'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Credentials, verifyOtpResponse, LoginResponse, RegisterResponse, RegisterUser, VerifyOtpRequest } from '@/types/auth';
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  verifyOtp as apiVerifyOtp,
} from './auth-api';

import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  exp: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: Credentials) => Promise<LoginResponse | undefined>;
  register: (credentials: RegisterUser) => Promise<RegisterResponse | undefined>;
  verifyOtp: (payload: VerifyOtpRequest) => Promise<verifyOtpResponse | undefined>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const decodeRoleFromToken = (token: string): string | null => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.role;
    } catch {
      return null;
    }
  };

  const login = async (credentials: Credentials) => {
    try {
      const data = await apiLogin(credentials);
      if (data?.access_token) {
        setIsAuthenticated(true);
        const role = decodeRoleFromToken(data.access_token);
        setIsAdmin(role === 'admin');
      }
      return data;
    } catch (error) {
      setIsAuthenticated(false);
      setIsAdmin(false);
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (credentials: RegisterUser) => {
    try {
      return await apiRegister(credentials);
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const verifyOtp = async (payload: VerifyOtpRequest) => {
    try {
      const data = await apiVerifyOtp(payload);
      console.log("verify data: ", data);
      if (data?.data.access_token) {
        localStorage.setItem('access_token', data.data.access_token);
        setIsAuthenticated(true);
        const role = decodeRoleFromToken(data.data.access_token);
        setIsAdmin(role === 'admin');
      }
      return data;
    } catch (error) {
      console.error('OTP verification failed', error);
      throw error;
    }
  };

  const logout = () => {
    apiLogout();
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const checkAuth = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
      const role = decodeRoleFromToken(token);
      setIsAdmin(role === 'admin');
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, login, register, verifyOtp, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
