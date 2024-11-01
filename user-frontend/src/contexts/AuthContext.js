import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // État de l'utilisateur connecté

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log("Token manquant dans le localStorage");
          return;
        }
  
        const response = await axios.get('/api/users/check-session', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.data.user) {
          setUser(response.data.user);
          console.log("Session utilisateur restaurée :", response.data.user);
        }
      } catch (error) {
        console.error("Erreur de session :", error);
        if (error.response && error.response.status === 401) {
          alert("Votre session a expiré. Veuillez vous reconnecter.");
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
    };
  
    checkSession();
  }, []);
  

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/users/login', credentials);
      const { id, name, email, token } = response.data; // Extraction directe des données
  
      if (id && name && email && token) {
        localStorage.setItem('token', token);
        
        // Mettre à jour `user` avec les informations utilisateur
        setUser({ id, name, email });
        console.log("État de l'utilisateur après connexion :", { id, name, email });
  
        return { id, name, email };
      } else {
        console.error("Erreur : données utilisateur ou token manquants dans la réponse.");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };
  

  const logout = async () => {
    await axios.post('/api/users/logout');
    localStorage.removeItem('token'); // Supprime le token lors de la déconnexion
    setUser(null); // Réinitialise l'état utilisateur
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
