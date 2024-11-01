// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import ProfilePage from './components/pages/ProfilePage';
import WelcomePage from './components/pages/WelcomePage';
import HealthDashboard from './components/pages/HealthDashboard'; // Import du tableau de bord santé

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/health-dashboard" element={<HealthDashboard />} /> {/* Nouvelle route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
