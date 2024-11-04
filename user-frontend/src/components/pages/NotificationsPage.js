import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Container, ListGroup, Button, Badge } from 'react-bootstrap';

const NotificationsPage = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Correction de l'URL
        const response = await axios.get(`http://localhost:5003/api/notifications/preferences/${user.id}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des notifications :", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const markAsRead = async (notificationId) => {
    try {
      await axios.post(`http://localhost:5003/api/notifications/${notificationId}/mark-as-read`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la notification :", error);
    }
  };

  if (loading) {
    return <p>Chargement des notifications...</p>;
  }

  return (
    <Container className="mt-4">
      <h2>Notifications</h2>
      <ListGroup variant="flush">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <ListGroup.Item
              key={notification.id}
              className={notification.isRead ? 'read' : 'unread'}
            >
              {notification.message}
              {!notification.isRead && (
                <Badge bg="info" className="ms-2">Nouvelle</Badge>
              )}
              <Button
                variant="link"
                size="sm"
                onClick={() => markAsRead(notification.id)}
                className="float-end"
              >
                Marquer comme lu
              </Button>
            </ListGroup.Item>
          ))
        ) : (
          <p>Aucune notification pour le moment.</p>
        )}
      </ListGroup>
    </Container>
  );
};

export default NotificationsPage;
