import React, { useState, useEffect } from 'react';

const InstitutionRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('/api/institution/requests')
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error('Error fetching requests:', error));
  }, []);

  const handleDecision = (applicationId, status) => {
    fetch(`/api/institution/requests/${applicationId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
      .then(() => {
        setRequests((prev) =>
          prev.filter((request) => request.ApplicationID !== applicationId)
        );
      })
      .catch((error) => console.error('Error updating request status:', error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Requests</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <ul>
          {requests.map((request) => (
            <li key={request.ApplicationID} className="p-2 border-b flex justify-between">
              <span>{request.CourseTitle} - {request.ProfessionalName}</span>
              <div>
                <button
                  onClick={() => handleDecision(request.ApplicationID, 'Accepted')}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecision(request.ApplicationID, 'Rejected')}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InstitutionRequests;
