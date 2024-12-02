import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    Title: '',
    Code: '',
    Schedule: 'Morning',
    DeliveryMethod: 'In-Person',
    Compensation: '',
    PreferredQualifications: '',
    Outline: '',
    TermID: '',
  });
  const [terms, setTerms] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  // 获取学期选项
  useEffect(() => {
    fetch('/api/terms')
      .then((response) => response.json())
      .then((data) => setTerms(data))
      .catch((error) => console.error('Error fetching terms:', error));
  }, []);

  // 更新表单字段
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  // 提交表单
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData),
    })
      .then((response) => {
        if (response.ok) {
          setStatusMessage('Course created successfully!');
          setTimeout(() => navigate('/institution/dashboard'), 2000);
        } else {
          setStatusMessage('Failed to create course.');
        }
      })
      .catch((error) => console.error('Error creating course:', error));
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
            name="Title"
            value={courseData.Title}
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
            name="Code"
            value={courseData.Code}
            onChange={handleInputChange}
            placeholder="Course Code"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Schedule</label>
          <select
            name="Schedule"
            value={courseData.Schedule}
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
            name="DeliveryMethod"
            value={courseData.DeliveryMethod}
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
            name="Compensation"
            value={courseData.Compensation}
            onChange={handleInputChange}
            placeholder="Compensation (e.g., 1000.00)"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Preferred Qualifications</label>
          <textarea
            name="PreferredQualifications"
            value={courseData.PreferredQualifications}
            onChange={handleInputChange}
            placeholder="Preferred Qualifications"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Outline</label>
          <textarea
            name="Outline"
            value={courseData.Outline}
            onChange={handleInputChange}
            placeholder="Course Outline"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Term</label>
          <select
            name="TermID"
            value={courseData.TermID}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Term</option>
            {terms.map((term) => (
              <option key={term.TermID} value={term.TermID}>
                {term.Name} ({term.StartDate} - {term.EndDate})
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
