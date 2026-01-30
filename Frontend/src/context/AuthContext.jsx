import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('appzeto_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      const userData = { ...data.user, token: data.token };
      setUser(userData);
      localStorage.setItem('appzeto_user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userDataInput) => {
    try {
      const data = await authService.signup(userDataInput);
      const userData = { ...data.user, token: data.token };
      setUser(userData);
      localStorage.setItem('appzeto_user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('appzeto_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
