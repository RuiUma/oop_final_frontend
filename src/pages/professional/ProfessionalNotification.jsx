import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfessionalNotification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = () => {
      fetch('/api/professional/notifications')
        .then((response) => response.json())
        .then((data) => setNotifications(data))
        .catch((error) => console.error('Error fetching notifications:', error));
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = (notification) => {
    if (notification.CourseID) {
      navigate(`/professional/courses/${notification.CourseID}`);
    }
  };

  const markAsRead = (notificationId) => {
    fetch(`/api/professional/notifications/${notificationId}/read`, {
      method: 'POST',
    })
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
        {notifications.length === 0 ? (
          <p>No new notifications</p>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.NotificationID}
                className="flex justify-between items-center p-2 border-b"
              >
                <span
                  onClick={() => handleNotificationClick(notification)}
                  className="cursor-pointer hover:text-blue-500"
                >
                  {notification.Message}
                </span>
                <button
                  onClick={() => markAsRead(notification.NotificationID)}
                  className="bg-gray-200 text-sm px-2 py-1 rounded hover:bg-gray-300"
                >
                  Mark as Read
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfessionalNotification;
