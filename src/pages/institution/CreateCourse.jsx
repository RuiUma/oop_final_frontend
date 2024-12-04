import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restfulPost } from '../../request/request';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: '',
    code: '',
    schedule: 'Morning',
    deliveryMethod: 'In-Person',
    compensation: '',
    preferredQualifications: '',
    outline: '',
    termId: '',
  });
  const [terms, setTerms] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const termOptions = JSON.parse(localStorage.getItem('termOptions')) || [];
    setTerms(termOptions);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    restfulPost('/course', courseData)
      .then((response) => {
        if (response.ok) {
          setStatusMessage('Course created successfully!');
          navigate('/institution/dashboard');
        } else {
          setStatusMessage('Failed to create course.');
        }
      })
      .catch((error) => {
        console.error('Error creating course:', error);
        setStatusMessage('Failed to create course.');
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Course</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-bold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleInputChange}
            placeholder="Course Title"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Code</label>
          <input
            type="text"
            name="code"
            value={courseData.code}
            onChange={handleInputChange}
            placeholder="Course Code"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Schedule</label>
          <select
            name="schedule"
            value={courseData.schedule}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          >
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Delivery Method</label>
          <select
            name="deliveryMethod"
            value={courseData.deliveryMethod}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          >
            <option value="In-Person">In-Person</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Compensation</label>
          <input
            type="number"
            name="compensation"
            value={courseData.compensation}
            onChange={handleInputChange}
            placeholder="Compensation (e.g., 1000.00)"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Preferred Qualifications</label>
          <textarea
            name="preferredQualifications"
            value={courseData.preferredQualifications}
            onChange={handleInputChange}
            placeholder="Preferred Qualifications"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Outline</label>
          <textarea
            name="outline"
            value={courseData.outline}
            onChange={handleInputChange}
            placeholder="Course Outline"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Term</label>
          <select
            name="termId"
            value={courseData.termId}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="" disabled>Select Term</option>
            {terms.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Course
        </button>
        {statusMessage && <p className="mt-4 text-green-500">{statusMessage}</p>}
      </form>
    </div>
  );
};

export default CreateCourse;
