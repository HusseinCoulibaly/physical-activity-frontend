import React from 'react';
import { ListGroup } from 'react-bootstrap';

const HealthSummary = ({ data }) => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item><strong>Total de Calories Brûlées :</strong> {data.totalCalories}</ListGroup.Item>
      <ListGroup.Item><strong>Calories Moyennes :</strong> {data.averageCalories}</ListGroup.Item>
      <ListGroup.Item><strong>Total de Pas :</strong> {data.totalSteps}</ListGroup.Item>
      <ListGroup.Item><strong>Nombre de Pas Moyen :</strong> {data.averageSteps}</ListGroup.Item>
    </ListGroup>
  );
};

export default HealthSummary;
