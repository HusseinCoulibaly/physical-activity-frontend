// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import ProfilePage from './components/pages/ProfilePage';
import WelcomePage from './components/pages/WelcomePage';
import HealthDashboard from './components/pages/HealthDashboard'; 
import RecommendationsPage from './components/pages/RecommendationsPage'; 
import NotificationsPage from './components/pages/NotificationsPage';
import NotificationPreferencesPage from './components/pages/NotificationPreferencesPage';

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
          <Route path="/health-dashboard" element={<HealthDashboard />} /> 
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/preferences" element={<NotificationPreferencesPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
