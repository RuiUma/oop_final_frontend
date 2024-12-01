import React, { useState, useEffect } from 'react';

const InstitutionNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = () => {
      fetch('/api/institution/notifications')
        .then((response) => response.json())
        .then((data) => setNotifications(data))
        .catch((error) => console.error('Error fetching notifications:', error));
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (notificationId) => {
    fetch(`/api/institution/notifications/${notificationId}/read`, { method: 'POST' })
      .then(() => {
        setNotifications((prev) =>
          prev.filter((notification) => notification.NotificationID !== notificationId)
        );
      })
      .catch((error) => console.error('Error marking notification as read:', error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <ul>
          {notifications.map((notification) => (
            <li key={notification.NotificationID} className="p-2 border-b flex justify-between">
              <span>{notification.Message}</span>
              <button
                onClick={() => markAsRead(notification.NotificationID)}
                className="bg-gray-300 px-2 py-1 rounded"
              >
                Mark as Read
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InstitutionNotification;
