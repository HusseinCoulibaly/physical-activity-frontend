import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const NavigationBar = () => {
  const { user, logout } = useContext( AuthContext );
  const history = useNavigate();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Activité Physique
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profil</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-2">Connecté en tant que : {user.email}</Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>Déconnexion</Button>
              </>
            ) : (
              <>
                <Button variant="outline-light" as={Link} to="/login" className="me-2">
                  Connexion
                </Button>
                <Button variant="light" as={Link} to="/register">
                  Inscription
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;