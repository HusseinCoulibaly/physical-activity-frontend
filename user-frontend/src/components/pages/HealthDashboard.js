import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Card, Container, Row, Col, Spinner, Form } from 'react-bootstrap';
import HealthSummary from './HealthSummary';
import AddHealthData from './AddHealthData';
import { toast, ToastContainer } from 'react-toastify';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import 'react-toastify/dist/ReactToastify.css';

const HealthDashboard = () => {
  const { user } = useContext(AuthContext);
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(7); 

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5001/api/health/${user.id}/summary`);
        const data = response.data;
        console.log("Données récupérées :", data); // Vérifie les données récupérées
        setHealthData(data);
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
  

  // Filtre les données de santé en fonction de la plage de temps sélectionnée
  const filterDataByTimeRange = () => {
    if (!healthData || !healthData.entries) return [];
    
    const currentDate = new Date();
    const filteredData = healthData.entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const timeDiff = (currentDate - entryDate) / (1000 * 60 * 60 * 24); // Différence en jours
      return timeDiff <= timeRange;
    });
    
    console.log("Données filtrées pour le graphique :", filteredData); // Vérifie les données filtrées
    return filteredData;
  };
  

  return (
    <Container>
      <ToastContainer />
      <h1 className="text-center my-4">Tableau de Bord de la Santé</h1>
      {isLoading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
          <p>Chargement des données de santé...</p>
        </div>
      ) : (
        <Row className="gy-4">
          {/* Sélecteur de plage de temps */}
          <Col md={12} className="text-end">
            <Form.Select
              aria-label="Sélecteur de plage de temps"
              value={timeRange}
              onChange={(e) => setTimeRange(Number(e.target.value))}
              className="mb-3"
            >
              <option value={7}>7 derniers jours</option>
              <option value={30}>30 derniers jours</option>
              <option value={90}>3 derniers mois</option>
              <option value={365}>Dernière année</option>
            </Form.Select>
          </Col>

          {/* Résumé de la santé */}
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Résumé de la Santé</Card.Title>
                {healthData && healthData.totalEntries > 0 ? (
                  <HealthSummary data={healthData} />
                ) : (
                  <p>Aucune donnée de santé disponible. Ajoutez vos premières données ci-dessous !</p>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Graphique des calories brûlées */}
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Calories Brûlées</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
  <LineChart data={filterDataByTimeRange()}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="caloriesBurned" stroke="#8884d8" activeDot={{ r: 8 }} />
  </LineChart>
</ResponsiveContainer>

              </Card.Body>
            </Card>
          </Col>

          {/* Formulaire d’ajout de données */}
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title>Ajouter des Données de Santé</Card.Title>
                <AddHealthData onNewData={setHealthData} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default HealthDashboard;
