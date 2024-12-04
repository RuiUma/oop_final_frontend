import React, { useState, useEffect } from 'react';
import { restfulPut, restfulGet } from '../../request/request';

const InstitutionProfile = () => {
  const [profile, setProfile] = useState({ address: '' });
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await restfulGet('/profile');
          const res = await response.json();
          console.log(res);
          
          if (res.code === 0) {
              if (res.data.address === null) {
                  setProfile({address: ''});
                  return;
              }
              setProfile({address: res.data.address});
          }          
      } catch (error) {
          console.error('Error fetching profile data:', error);
      }
  };

  fetchData()
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Institution Profile</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Address</label>
          <textarea
            name="address"
            value={profile.address}
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
