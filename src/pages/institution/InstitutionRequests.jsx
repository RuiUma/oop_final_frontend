import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restfulGet, restfulPut } from '../../request/request'

const InstitutionRequests = () => {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  const fetchRequests = async () => {
    const response = await restfulGet('/request');
    const res = await response.json()
    setRequests(res.data);
  }

  useEffect(() => {
    fetchRequests()
  }, []);

  const handleDecision = async (applicationId, status) => {
    const response = await restfulPut('/request', { status, applicationId });
    const res = await response.json()
    if (res.code === 0) {
      fetchRequests();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Requests</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <ul>
          {requests.map((request) => (
            <li key={request.applicationId} className="p-2 border-b flex justify-between">
              <span>{request.courseTitle} - {request.professionalName}</span>
              <div>
                <button
                  onClick={() => handleDecision(request.applicationId, 'Accepted')}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecision(request.applicationId, 'Rejected')}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
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

export default InstitutionRequests;
