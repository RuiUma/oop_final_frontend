import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProfessionalCourseInfo = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState('');

  useEffect(() => {
    fetch(`/api/courses/${courseId}`)
      .then((response) => response.json())
      .then((data) => setCourseDetails(data))
      .catch((error) => console.error('Error fetching course details:', error));
  }, [courseId]);

  const handleApply = () => {
    fetch(`/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId }),
    })
      .then((response) => {
        if (response.ok) {
          setApplicationStatus('Application submitted successfully!');
        } else {
          setApplicationStatus('Failed to submit application.');
        }
      })
      .catch((error) => console.error('Error submitting application:', error));
  };

  if (!courseDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Course Details: {courseDetails.Title}
      </h1>
      <div className="bg-white p-4 rounded shadow-md">
        <p><strong>Code:</strong> {courseDetails.Code}</p>
        <p><strong>Term:</strong> {courseDetails.TermName}</p>
        <p><strong>Schedule:</strong> {courseDetails.Schedule}</p>
        <p><strong>Delivery Method:</strong> {courseDetails.DeliveryMethod}</p>
        <p><strong>Compensation:</strong> ${courseDetails.Compensation}</p>
        <p><strong>Preferred Qualifications:</strong> {courseDetails.PreferredQualifications}</p>
        <p><strong>Outline:</strong> {courseDetails.Outline}</p>
      </div>
      <button
        onClick={handleApply}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Apply to Teach
      </button>
      {applicationStatus && (
        <p className="mt-4 text-green-500">{applicationStatus}</p>
      )}
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back
      </button>
    </div>
  );
};

export default ProfessionalCourseInfo;
