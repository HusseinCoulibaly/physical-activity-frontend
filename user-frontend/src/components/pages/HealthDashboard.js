import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import HealthSummary from './HealthSummary';
import AddHealthData from './AddHealthData';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HealthDashboard = () => {
  const { user } = useContext(AuthContext);
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5001/api/health/${user.id}/summary`); // URL mise à jour
        setHealthData(response.data);
      } catch (error) {
        console.error("Erreur de récupération des données de santé :", error);
        toast.error("Impossible de charger les données de santé.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchHealthData();
    }
  }, [user]);

  return (
    <div>
      <ToastContainer />
      <h1>Tableau de Bord de la Santé</h1>
      {isLoading ? (
        <p>Chargement des données de santé...</p>
      ) : healthData && healthData.totalEntries > 0 ? (
        <HealthSummary data={healthData} />
      ) : (
        <p>Aucune donnée de santé disponible. Ajoutez vos premières données ci-dessous !</p>
      )}
      <AddHealthData onNewData={setHealthData} />
    </div>
  );
};

export default HealthDashboard;
