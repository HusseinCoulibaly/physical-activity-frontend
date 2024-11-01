import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import { Form, Button } from 'react-bootstrap';

const AddHealthData = ({ onNewData }) => {
  const { user } = useContext(AuthContext);
  const [heartRate, setHeartRate] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [steps, setSteps] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Fréquence Cardiaque</Form.Label>
        <Form.Control
          type="number"
          placeholder="Fréquence Cardiaque"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Calories Brûlées</Form.Label>
        <Form.Control
          type="number"
          placeholder="Calories Brûlées"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Nombre de Pas</Form.Label>
        <Form.Control
          type="number"
          placeholder="Nombre de Pas"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Ajouter
      </Button>
    </Form>
  );
};

export default AddHealthData;
