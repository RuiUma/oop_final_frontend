import React, { useState, useEffect } from 'react';

const ProfessionalProfile = () => {
  const [profile, setProfile] = useState({
    CurrentPosition: '',
    EducationBackground: '',
    AreaOfExpertise: '',
  });
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    fetch('/api/professional/profile')
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error('Error fetching profile:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    fetch('/api/professional/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    })
      .then((response) => {
        if (response.ok) {
          setUpdateStatus('Profile updated successfully!');
        } else {
          setUpdateStatus('Failed to update profile.');
        }
      })
      .catch((error) => console.error('Error updating profile:', error));
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
            name="CurrentPosition"
            value={profile.CurrentPosition}
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
            name="EducationBackground"
            value={profile.EducationBackground}
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
            name="AreaOfExpertise"
            value={profile.AreaOfExpertise}
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
