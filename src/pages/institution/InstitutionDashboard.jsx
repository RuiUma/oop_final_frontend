import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restfulGet } from '../../request/request';

const InstitutionDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {

    const fetchCourses = async () => {
      try {
        const response = await restfulGet('/institution/dashboard');
        const res = await response.json();
        setCourses(res.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses()
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/institution/courses/${courseId}`);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Institution Dashboard</h1>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleNavigate('/institution/notifications')}
          >
            Notifications
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => handleNavigate('/institution/requests')}
          >
            Requests
          </button>
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-white p-4 rounded shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Courses</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleNavigate('/institution/courses/new')}
          >
            Add Course
          </button>
        </div>
        <ul>
          {courses.map((course) => (
            <li
              key={course.courseId}
              className="p-2 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => handleCourseClick(course.courseId)}
            >
              {course.title} - {course.code}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InstitutionDashboard;
