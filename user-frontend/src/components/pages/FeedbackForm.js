import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const FeedbackForm = ({ recommendationId, onFeedbackSubmitted }) => {
  const [rating, setRating] = useState(3); // Note par défaut de 3
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      // Envoyer le feedback au backend
      await axios.post('http://localhost:5004/api/feedback', {
        recommendationId,
        rating,
        comment,
        userId: recommendationId // Utilisez ici l'ID de l'utilisateur
      });

      onFeedbackSubmitted(); // Appelle une fonction pour rafraîchir les feedbacks, si nécessaire
      setRating(3);
      setComment('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du feedback:', error);
      alert('Erreur lors de l\'envoi du feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="rating">
        <Form.Label>Note (1-5)</Form.Label>
        <Form.Control
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />
      </Form.Group>

      <Form.Group controlId="comment" className="mt-2">
        <Form.Label>Commentaire</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={submitting} className="mt-2">
        {submitting ? 'Envoi...' : 'Soumettre le Feedback'}
      </Button>
    </Form>
  );
};

export default FeedbackForm;
