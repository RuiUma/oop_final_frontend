import React, { useState, useEffect } from 'react';

import { restfulPut, restfulGet } from '../../request/request';

const ProfessionalProfile = () => {
  const [profile, setProfile] = useState({
    currentPosition: '',
    educationBackground: '',
    areaOfExpertise: '',
    institutionId: ''
  });
  const [updateStatus, setUpdateStatus] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {

    const institutionOptions = JSON.parse(localStorage.getItem('institutionOptions')) || [];

    setOptions(institutionOptions);

    const fetchData = async () => {
        try {
            const response = await restfulGet('/profile');
            const res = await response.json();
            console.log(res);
            
            if (res.code === 0) {
              const profileObj = {
                currentPosition: res.data.currentPosition ? "" : res.data.currentPosition,
                educationBackground: res.data.educationBackground ? "" : res.data.educationBackground,
                areaOfExpertise: res.data.areaOfExpertise ? "" : res.data.areaOfExpertise,
                institutionId: res.data.institutionId ? "" : res.data.institutionId
              }

                setProfile(profileObj);
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
    const response = await restfulPut('/profile', profile)
    const res = await response.json();
    console.log(res);
    if (res.code !== 0) {
      setUpdateStatus("Update Failed")
      return;
    }
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

        <div className="mb-4">
          <select
            name="institution"
            value={profile.institutionId}
            onChange={handleInputChange}
            className="border p-2 rounded"
          >
            <option value="" disabled>Select Institution</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
