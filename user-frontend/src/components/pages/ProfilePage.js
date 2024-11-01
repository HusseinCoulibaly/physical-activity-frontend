import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Profil</h1>
      {user ? (
        <p>Email : {user.email}</p>
      ) : (
        <p>Chargement des informations utilisateur...</p>
      )}
    </div>
  );
};

export default ProfilePage;
