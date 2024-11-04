// ProfilePage.js
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-container">
      <h2>Mon Profil</h2>
      <div className="profile-card">
        <div className="profile-avatar">
          <img src="/default-avatar.png" alt="Avatar de profil" />
        </div>
        <div className="profile-details">
          <h3>{user?.name || 'Nom utilisateur'}</h3>
          <p className="profile-email"><strong>Email:</strong> {user?.email || 'Email non disponible'}</p>
          {user?.goals && (
            <p className="profile-goals"><strong>Objectif:</strong> {user.goals}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
