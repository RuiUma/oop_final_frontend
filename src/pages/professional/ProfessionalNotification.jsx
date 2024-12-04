import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restfulGet, restfulPut } from '../../request/request';

const ProfessionalNotification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const response = await restfulGet('/notification')
    const res = await response.json();
    setNotifications(res.data);
  };
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (notificationId) => {
    await restfulPut('/notification', { notificationId })
    fetchNotifications();
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
                key={notification.notificationID}
                className="flex justify-between items-center p-2 border-b"
              >
                <span
                  className="cursor-pointer hover:text-blue-500"
                >
                  {notification.message}
                </span>
                <button
                  onClick={() => markAsRead(notification.notificationID)}
                  className="bg-gray-200 text-sm px-2 py-1 rounded hover:bg-gray-300"
                >
                  Mark as Read
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back
      </button>
    </div>
  );
};

export default ProfessionalNotification;
