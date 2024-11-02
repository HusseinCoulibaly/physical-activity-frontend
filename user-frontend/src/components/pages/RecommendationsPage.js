import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Button, Container, Card, ListGroup } from 'react-bootstrap';

const RecommendationsPage = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5002/api/recommendations/generate', {
        userId: user.id
      });
      setRecommendations(response.data.activities);
    } catch (error) {
      console.error("Erreur lors de la récupération des recommandations :", error);
      alert("Impossible de charger les recommandations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <Container className="my-4">
      <h2>Recommandations Personnalisées</h2>
      <Button variant="primary" onClick={fetchRecommendations} disabled={loading}>
        {loading ? "Chargement..." : "Actualiser les Recommandations"}
      </Button>

      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Vos recommandations d'activités</Card.Title>
          {recommendations.length > 0 ? (
            <ListGroup variant="flush">
              {recommendations.map((activity, index) => (
                <ListGroup.Item key={index}>{activity}</ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Aucune recommandation disponible.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecommendationsPage;
