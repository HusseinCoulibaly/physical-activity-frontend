import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const NotificationsPage = () => {
  const { user } = useContext(AuthContext); // Récupère l'utilisateur du contexte
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Récupérer les notifications de l'utilisateur uniquement si userId est disponible
    const fetchNotifications = async () => {
      if (!user || !user.id) return;

      try {
        // Utilisation de l'URL complète pour accéder au service de notifications sur le port 5003
        const response = await axios.get(`http://localhost:5003/api/notifications/${user.id}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des notifications :", error);
      }
    };

    fetchNotifications();
  }, [user]);

  const markAsRead = async (notificationId) => {
    try {
      // Utilisation de l'URL complète pour la mise à jour de la notification
      await axios.put(`http://localhost:5003/api/notifications/${notificationId}/read`);
      setNotifications(notifications.map(notification =>
        notification._id === notificationId ? { ...notification, isRead: true } : notification
      ));
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la notification :", error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification._id} style={{ textDecoration: notification.isRead ? 'line-through' : 'none' }}>
            <p><strong>Type:</strong> {notification.type}</p>
            <p><strong>Message:</strong> {notification.message}</p>
            <p><strong>Date:</strong> {new Date(notification.createdAt).toLocaleString()}</p>
            {!notification.isRead && (
              <button onClick={() => markAsRead(notification._id)}>Marquer comme lu</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
