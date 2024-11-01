import React from 'react';

const HealthSummary = ({ data }) => {
  return (
    <div>
      <h2>Résumé de la Santé</h2>
      <p>Total de Calories Brûlées : {data.totalCalories}</p>
      <p>Calories Moyennes : {data.averageCalories}</p>
      <p>Total de Pas : {data.totalSteps}</p>
      <p>Nombre de Pas Moyen : {data.averageSteps}</p>
    </div>
  );
};

export default HealthSummary;
