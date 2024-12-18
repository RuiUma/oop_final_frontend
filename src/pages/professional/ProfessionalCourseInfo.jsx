import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restfulGet, restfulPost } from '../../request/request';

const ProfessionalCourseInfo = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState({});
  const [applicationStatus, setApplicationStatus] = useState('');

  const getCourseInfo = async () => {
    try {
      const response = await restfulGet('/courseDetail', {courseId});
      const res = await response.json();
      if (res.code === 0) {
        console.log(res);
        
        setCourseDetails(res.data.courseDetails);
        setApplicationStatus(res.data.applicationStatus);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };
  
  useEffect(() => {
    

    getCourseInfo();
  }, [courseId]);

  const handleApply = async () => {
    const response = await restfulPost('/request', {courseId});
    const res = await response.json();
    console.log(res);
    if (res.code === 0) {
      getCourseInfo()

    } else {
      setApplicationStatus('Apply failed');
    }
  };

  if (!courseDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Course Details: {courseDetails.title}
      </h1>
      <div className="bg-white p-4 rounded shadow-md">
        <p><strong>Code:</strong> {courseDetails.code}</p>
        <p><strong>Term:</strong> {courseDetails.termName}</p>
        <p><strong>Schedule:</strong> {courseDetails.schedule}</p>
        <p><strong>Delivery Method:</strong> {courseDetails.deliveryMethod}</p>
        <p><strong>Compensation:</strong> ${courseDetails.compensation}</p>
        <p><strong>Preferred Qualifications:</strong> {courseDetails.preferredQualifications}</p>
        <p><strong>Outline:</strong> {courseDetails.outline}</p>
      </div>
      {
        <button
          onClick={handleApply}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply to Teach
        </button>
      }&nbsp;&nbsp;
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
