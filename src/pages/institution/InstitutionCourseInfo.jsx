import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restfulGet, restfulPut } from '../../request/request';

const InstitutionCourseInfo = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState({
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
  const [saveStatus, setSaveStatus] = useState('');

  const getCourseInfo = async () => {
    try {
      const response = await restfulGet('/course', { courseId });
      const res = await response.json();
      if (res.code === 0) {
        setCourseDetails(res.data);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  useEffect(() => {
    const termOptions = JSON.parse(localStorage.getItem('termOptions')) || [];
    setTerms(termOptions);
    getCourseInfo();
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await restfulPut('/course', { ...courseDetails, courseId });
      const res = await response.json();
      if (res.code === 0) {
        setSaveStatus('Course updated successfully!');
      } else {
        setSaveStatus('Failed to update course.');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      setSaveStatus('Failed to update course.');
    }
  };

  if (!courseDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Course</h1>
      <form className="bg-white p-6 rounded shadow-md space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={courseDetails.title}
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
            value={courseDetails.code}
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
            value={courseDetails.schedule}
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
            value={courseDetails.deliveryMethod}
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
            value={courseDetails.compensation}
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
            value={courseDetails.preferredQualifications}
            onChange={handleInputChange}
            placeholder="Preferred Qualifications"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Outline</label>
          <textarea
            name="outline"
            value={courseDetails.outline}
            onChange={handleInputChange}
            placeholder="Course Outline"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Term</label>
          <select
            name="termId"
            value={courseDetails.termId}
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
          type="button"
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
        {saveStatus && <p className="mt-4 text-green-500">{saveStatus}</p>}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default InstitutionCourseInfo;
