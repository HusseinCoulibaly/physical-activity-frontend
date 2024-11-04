import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Button, Container, Card, Spinner, Row, Col } from 'react-bootstrap';
import { FaWalking, FaRunning, FaBicycle, FaYinYang } from 'react-icons/fa'; 
import './RecommendationsPage.css';
import FeedbackForm from './FeedbackForm';

const RecommendationsPage = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getActivityDetails = (activity) => {
    switch (activity) {
      case 'marche': return { icon: <FaWalking color="#17a2b8" />, name: 'Marche' };
      case 'course': return { icon: <FaRunning color="#007bff" />, name: 'Course' };
      case 'vélo': return { icon: <FaBicycle color="#28a745" />, name: 'Vélo' };
      case 'yoga': return { icon: <FaYinYang color="#ffc107" />, name: 'Yoga' };
      default: return { icon: <FaWalking color="#6c757d" />, name: 'Activité' };
    }
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5002/api/recommendations/generate', { userId: user.id });
      setRecommendations(response.data.activities || []);
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
      <h2 className="text-center">Recommandations Personnalisées</h2>
      <div className="text-center mb-3">
        <Button variant="primary" onClick={fetchRecommendations} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Actualiser les Recommandations"}
        </Button>
      </div>

      <Row className="gy-4">
        {recommendations.length > 0 ? (
          recommendations.map((activity, index) => {
            const { icon, name } = getActivityDetails(activity);
            return (
              <Col md={6} lg={4} key={index}>
                <Card className="recommendation-card shadow-sm">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      {icon} <span className="ms-2">{name}</span>
                    </div>
                    <Card.Text>
                      Cette activité est idéale pour améliorer votre bien-être physique et mental.
                    </Card.Text>

                    {/* Ajouter le formulaire de feedback */}
                    <FeedbackForm recommendationId={index} onFeedbackSubmitted={fetchRecommendations} />
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col>
            <p className="text-center text-muted">Aucune recommandation disponible pour le moment.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default RecommendationsPage;
