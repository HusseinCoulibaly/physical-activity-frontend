
import React from 'react';
//import logo from '../../assets/logo.webp';
import './WelcomePage.css'; // Ajoutons du style

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="logo-container">
      <img src="/logo.webp" alt="Logo" className="logo" />

      </div>
      <footer className="footer">
        <p>Compagnie: Teccartfit</p>
        <p>Nous contacter: teccartfit-serviceclient@gmail.com</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
