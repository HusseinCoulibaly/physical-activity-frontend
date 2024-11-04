import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Form, Button, Card, Container } from 'react-bootstrap';

const NotificationPreferencesPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [frequency, setFrequency] = useState('daily');
  const [channels, setChannels] = useState(['push']);
  const [types, setTypes] = useState(['reminder']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5003/api/notifications/preferences', {
        userId: user.id,
        frequency,
        channels,
        types,
      });

      // Redirige vers la page d'accueil après la soumission
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des préférences :", error);
      alert("Erreur lors de l'enregistrement des préférences");
    }
  };

  return (
    <Container>
      <Card className="my-4">
        <Card.Body>
          <h2>Préférences de Notifications</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Fréquence</Form.Label>
              <Form.Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                <option value="daily">Quotidienne</option>
                <option value="weekly">Hebdomadaire</option>
                <option value="monthly">Mensuelle</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Canaux</Form.Label>
              <Form.Check 
                type="checkbox" 
                label="Push" 
                checked={channels.includes('push')}
                onChange={(e) => {
                  setChannels((prev) => 
                    e.target.checked ? [...prev, 'push'] : prev.filter((ch) => ch !== 'push')
                  );
                }}
              />
              <Form.Check 
                type="checkbox" 
                label="Email" 
                checked={channels.includes('email')}
                onChange={(e) => {
                  setChannels((prev) => 
                    e.target.checked ? [...prev, 'email'] : prev.filter((ch) => ch !== 'email')
                  );
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Types</Form.Label>
              <Form.Check 
                type="checkbox" 
                label="Rappel" 
                checked={types.includes('reminder')}
                onChange={(e) => {
                  setTypes((prev) => 
                    e.target.checked ? [...prev, 'reminder'] : prev.filter((ty) => ty !== 'reminder')
                  );
                }}
              />
              <Form.Check 
                type="checkbox" 
                label="Motivation" 
                checked={types.includes('motivation')}
                onChange={(e) => {
                  setTypes((prev) => 
                    e.target.checked ? [...prev, 'motivation'] : prev.filter((ty) => ty !== 'motivation')
                  );
                }}
              />
              <Form.Check 
                type="checkbox" 
                label="Défi" 
                checked={types.includes('challenge')}
                onChange={(e) => {
                  setTypes((prev) => 
                    e.target.checked ? [...prev, 'challenge'] : prev.filter((ty) => ty !== 'challenge')
                  );
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Enregistrer les préférences
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotificationPreferencesPage;
