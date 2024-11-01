import axios from 'axios';

// Définir la base de l'URL de l'API si nécessaire
axios.defaults.baseURL = 'http://localhost:5000';

// Intercepteur de réponse pour gérer les erreurs 401 (Unauthorized)
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirige vers la page de connexion et supprime le token du stockage local
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;
