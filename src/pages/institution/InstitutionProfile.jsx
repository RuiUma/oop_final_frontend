import React, { useState, useEffect } from 'react';

const InstitutionProfile = () => {
  const [profile, setProfile] = useState({ Address: '' });
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    fetch('/api/institution/profile')
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error('Error fetching profile:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    fetch('/api/institution/profile', {
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Institution Profile</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Address</label>
          <textarea
            name="Address"
            value={profile.Address}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        {updateStatus && <p className="text-green-500 mt-4">{updateStatus}</p>}
      </div>
    </div>
  );
};

export default InstitutionProfile;
