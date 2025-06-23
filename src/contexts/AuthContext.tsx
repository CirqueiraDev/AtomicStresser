"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';

interface AuthContextType {
  isLogged: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  admin: (value: boolean) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Função para verificar se o token é válido
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const admin = JSON.parse(localStorage.getItem('admin') || 'false'); // <-- add isso

      if (!token) {
        setIsLogged(false);
        setIsAdmin(false); // <-- adicione isso também
        setIsLoading(false);
        return;
      }

      const response = await api.get('/verify-token');

      if (response.status === 200) {
        setIsLogged(true);
        setIsAdmin(admin); // <-- define com base no localStorage
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('admin'); // limpa admin também
        setIsLogged(false);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      setIsLogged(false);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };


  // Função para fazer login
  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsLogged(true);
  };

  const admin = (value: boolean) => {
    localStorage.setItem('admin', JSON.stringify(value));
    setIsAdmin(value);
  };

  // Função para fazer logout
  const logout = () => {
    localStorage.removeItem('token');
    setIsLogged(false);
  };

  // Verificar autenticação ao montar o componente
  useEffect(() => {
    checkAuth();
  }, []);

  // Verificar autenticação quando a página ganha foco (usuário volta para a aba)
  useEffect(() => {
    const handleFocus = () => {
      checkAuth();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const value: AuthContextType = {
    isLogged,
    isAdmin,
    isLoading,
    admin,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}