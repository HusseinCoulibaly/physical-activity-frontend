import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [goals, setGoals] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculer l’âge pour valider les 16 ans minimum
  const isAgeValid = () => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const isOver16 = (age > 16) || (age === 16 && today >= new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()));
    return isOver16;
  };

  // Vérification de la force du mot de passe
  const isPasswordValid = () => {
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password) && /[@$!%*?&]/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAgeValid()) {
      toast.error("Vous devez avoir au moins 16 ans pour vous inscrire.");
      return;
    }

    if (!isPasswordValid()) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre, et un symbole.");
      return;
    }

    setLoading(true); // Activer l'indicateur de chargement
    try {
      const response = await axios.post('/api/users/register', { name, email, password, dob, goals });
      
      if (response.status === 201) {
        toast.success("Inscription réussie ! Redirection vers la connexion...");
        setTimeout(() => navigate('/login'), 2000); // Redirige après un court délai
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Échec de l'inscription";
      toast.error(errorMessage); // Affiche l'erreur retournée par le backend ou un message par défaut
      console.error("Erreur d'inscription :", errorMessage);
    } finally {
      setLoading(false); // Désactiver l'indicateur de chargement
    }
  };

  return (
    <div className="form-container">
      <ToastContainer /> {/* Conteneur pour les notifications Toast */}
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Inscription</h2>
        
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nom" 
          required 
        />
        
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          required 
        />
        
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Mot de passe" 
          required 
        />
        
        <input 
          type="date" 
          value={dob} 
          onChange={(e) => setDob(e.target.value)} 
          placeholder="Date de naissance" 
          required 
        />
        
        <select value={goals} onChange={(e) => setGoals(e.target.value)} required>
          <option value="">Sélectionnez votre objectif</option>
          <option value="Perte de poids">Perte de poids</option>
          <option value="Renforcement musculaire">Renforcement musculaire</option>
          <option value="Amélioration cardiovasculaire">Amélioration cardiovasculaire</option>
          <option value="Souplesse et mobilité">Souplesse et mobilité</option>
          <option value="Réduction du stress">Réduction du stress</option>
        </select>
        
        <button type="submit" disabled={loading}>
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
