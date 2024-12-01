import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InstitutionDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/institution/courses')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/institution/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Institution Dashboard</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">My Courses</h2>
        <ul>
          {courses.map((course) => (
            <li
              key={course.CourseID}
              className="p-2 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => handleCourseClick(course.CourseID)}
            >
              {course.Title} - {course.Code}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InstitutionDashboard;
