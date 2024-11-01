import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const checkSession = async () => {
      try {
        const response = await axios.get('/api/user/check-session');
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };
    checkSession();
  }, []);

  const login = async (credentials) => {
    const response = await axios.post('/api/user/login', credentials);
    setUser(response.data.user);
    return response;
  };

  const logout = () => {
    setUser(null);
    axios.post('/api/user/logout');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
