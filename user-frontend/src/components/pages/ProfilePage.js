import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const history = useNavigate();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return user ? (
    <div>
      <h2>Profil</h2>
      <p>Email : {user.email}</p>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  ) : (
    <p>Chargement...</p>
  );
};

export default ProfilePage;