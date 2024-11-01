import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';

const AddHealthData = ({ onNewData }) => {
  const { user } = useContext(AuthContext);
  const [heartRate, setHeartRate] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [steps, setSteps] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Utilisation de l'URL complète pour l'ajout de données
      const response = await axios.post('http://localhost:5001/api/health/add', {
        userId: user.id,
        heartRate,
        caloriesBurned,
        steps,
      });

      onNewData(response.data);
      toast.success("Données de santé ajoutées avec succès !");
      setHeartRate('');
      setCaloriesBurned('');
      setSteps('');
    } catch (error) {
      console.error("Erreur lors de l'ajout des données de santé :", error);
      toast.error("Échec de l'ajout des données de santé.");
    }
  };

  return (
    <div>
      <h2>Ajouter des Données de Santé</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Fréquence Cardiaque"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Calories Brûlées"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Nombre de Pas"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddHealthData;
