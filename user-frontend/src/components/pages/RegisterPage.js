import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; 

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [goals, setGoals] = useState('');
  const navigate = useNavigate();

  // Calculer l’âge pour valider les 16 ans minimum
  const isAgeValid = () => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const isOver16 = (age > 16) || (age === 16 && today >= new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()));
    return isOver16;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isAgeValid()) {
      alert("Vous devez avoir au moins 16 ans pour vous inscrire.");
      return;
    }
  
    try {
      const response = await axios.post('/api/users/register', { name, email, password, dob, goals });
  
      // Vérifie si la réponse est un succès (code 201)
      if (response.status === 201) {
        navigate('/login'); // Redirige vers la page de connexion après inscription réussie
      } else {
        console.error("Réponse inattendue :", response);
        alert("Une erreur inattendue s'est produite.");
      }
    } catch (error) {
      console.error("Erreur d'inscription :", error.response?.data || error.message);
      alert("Échec de l'inscription");
    }
  };
  

  return (
    <div className="form-container">
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
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"// Validation de format email
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
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default RegisterPage;
