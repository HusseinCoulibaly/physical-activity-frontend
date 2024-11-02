import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaWalking, FaDumbbell, FaHeartbeat } from 'react-icons/fa';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      {/* Animation du Logo */}
      <motion.div
        className="logo-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img src="/logo.webp" alt="Logo" className="logo" />
      </motion.div>

      {/* Texte de bienvenue animé */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="welcome-text"
      >
        Bienvenue chez Teccartfit
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="welcome-subtext"
      >
        Votre partenaire pour une meilleure santé et des recommandations personnalisées.
      </motion.p>

      {/* Icônes d’activités avec animation */}
      <Container className="icon-container">
        <Row className="text-center mt-5">
          <Col>
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaWalking size={50} className="fitness-icon walking-icon" />
              <p>Marche</p>
            </motion.div>
          </Col>
          <Col>
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaDumbbell size={50} className="fitness-icon dumbbell-icon" />
              <p>Musculation</p>
            </motion.div>
          </Col>
          <Col>
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaHeartbeat size={50} className="fitness-icon heartbeat-icon" />
              <p>Cardio</p>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Bouton d'appel à l'action */}
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-center mt-4"
      >
        <Button as={Link} to="/recommendations" variant="primary" className="cta-button">
          Explorer les Recommandations
        </Button>
      </motion.div>

      {/* Footer */}
      <footer className="footer">
        <p>Compagnie: Teccartfit</p>
        <p>Nous contacter: teccartfit-serviceclient@gmail.com</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
