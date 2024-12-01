import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const InstitutionCourseInfo = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    fetch(`/api/courses/${courseId}`)
      .then((response) => response.json())
      .then((data) => setCourseDetails(data))
      .catch((error) => console.error('Error fetching course details:', error));
  }, [courseId]);

  const handleUpdate = () => {
    fetch(`/api/courses/${courseId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseDetails),
    })
      .then((response) => {
        if (response.ok) {
          setUpdateStatus('Course updated successfully!');
        } else {
          setUpdateStatus('Failed to update course.');
        }
      })
      .catch((error) => console.error('Error updating course:', error));
  };

  if (!courseDetails) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Course Info</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Title</label>
          <input
            type="text"
            name="Title"
            value={courseDetails.Title}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Schedule</label>
          <select
            name="Schedule"
            value={courseDetails.Schedule}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          >
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
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

export default InstitutionCourseInfo;
