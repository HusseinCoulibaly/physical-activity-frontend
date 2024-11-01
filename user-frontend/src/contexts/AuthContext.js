import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Charger l'utilisateur si une session est active
    const checkSession = async () => {
      try {
        console.log("Vérification du token dans localStorage...");
        const token = localStorage.getItem('token');
        if (!token) throw new Error("Token manquant dans le localStorage");
    
        console.log("Envoi de la requête à /api/users/check-session avec le token...");
        const response = await axios.get('/api/users/check-session', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log("Réponse reçue de l'API :", response.data);
        return response.data.user;
      } catch (error) {
        console.error("Erreur de session :", error);
        if (error.response && error.response.status === 401) {
          alert("Votre session a expiré. Veuillez vous reconnecter.");
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          console.error("Une erreur inattendue est survenue :", error.message);
        }
        return null;
      }
    };
    
    
    
    checkSession();
  }, []);

  const login = async (credentials) => {
    const response = await axios.post('/api/users/login', credentials);
    const token = response.data.token;  // Assure-toi que le backend retourne bien un token dans response.data.token
    localStorage.setItem('token', token); // Stocker le token pour les requêtes futures
    return response.data.user;
  };
  
  

  const logout = async () => {
    await axios.post('/api/users/logout');
    setUser(null); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
