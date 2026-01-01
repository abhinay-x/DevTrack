import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('devtrack_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    setUser(data);
    localStorage.setItem('devtrack_user', JSON.stringify(data));
  };

  const register = async (payload) => {
    const { data } = await api.post('/api/auth/register', payload);
    setUser(data);
    localStorage.setItem('devtrack_user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('devtrack_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
