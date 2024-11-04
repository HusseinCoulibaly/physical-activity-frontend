import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import './NotificationsPage.css';

const NotificationsPage = () => {
  const { user } = useContext(AuthContext); // Récupère l'utilisateur du contexte
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Récupérer les notifications de l'utilisateur uniquement si userId est disponible
    const fetchNotifications = async () => {
      if (!user || !user.id) return;

      try {
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
      await axios.put(`http://localhost:5003/api/notifications/${notificationId}/read`);
      setNotifications(notifications.map(notification =>
        notification._id === notificationId ? { ...notification, isRead: true } : notification
      ));
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la notification :", error);
    }
  };

  return (
    <div className="notifications-container">
      <h2>Mes Notifications</h2>
      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div key={notification._id} className={`notification-card ${notification.isRead ? 'read' : 'unread'}`}>
              <div className="notification-header">
                <span className="notification-type">{notification.type}</span>
                {!notification.isRead && (
                  <button className="mark-as-read" onClick={() => markAsRead(notification._id)}>Marquer comme lu</button>
                )}
              </div>
              <p className="notification-message">{notification.message}</p>
              <p className="notification-date">{new Date(notification.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="no-notifications">Aucune notification à afficher</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
