import React, { useState, useEffect } from 'react';

import { restfulPut, restfulGet } from '../../request/request';

const ProfessionalProfile = () => {
  const [profile, setProfile] = useState({
    currentPosition: '',
    educationBackground: '',
    areaOfExpertise: '',
  });
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect( () => {

    const fetchData = async () => {
        try {
            const response = await restfulGet('/profile');
            const res = await response.json();
            console.log(res);
            
            if (res.code === 0) {
                res.data.currentPosition = res.data.currentPosition == null ? "" : res.data.currentPosition;
                res.data.educationBackground = res.data.educationBackground == null ? "" : res.data.educationBackground;
                res.data.areaOfExpertise = res.data.areaOfExpertise == null ? "" : res.data.areaOfExpertise;

                setProfile(res.data);
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    fetchData();

      
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    console.log(profile);
    setUpdateStatus("Update Successful")
    
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Professional Profile</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPosition">
            Current Position
          </label>
          <input
            type="text"
            id="currentPosition"
            name="currentPosition"
            value={profile.currentPosition}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="educationBackground">
            Education Background
          </label>
          <textarea
            id="educationBackground"
            name="educationBackground"
            value={profile.educationBackground}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="areaOfExpertise">
            Area of Expertise
          </label>
          <textarea
            id="areaOfExpertise"
            name="areaOfExpertise"
            value={profile.areaOfExpertise}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Profile
        </button>
        {updateStatus && (
          <p className="mt-4 text-green-500">{updateStatus}</p>
        )}
      </div>
    </div>
  );
};

export default ProfessionalProfile;
