import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfessionalDashboard = () => {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    institution: '',
    courseCode: '',
    term: '',
  });
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch('/api/professional/applications')
      .then((response) => response.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error('Error fetching applications:', error));
  }, []);

  const handleSearch = () => {
    const queryParams = new URLSearchParams(searchFilters).toString();
    fetch(`/api/courses?${queryParams}`)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching courses:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseClick = (courseId) => {
    navigate(`/professional/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Professional Dashboard</h1>

      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Search Courses</h2>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="institution"
            value={searchFilters.institution}
            onChange={handleInputChange}
            placeholder="Institution"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="courseCode"
            value={searchFilters.courseCode}
            onChange={handleInputChange}
            placeholder="Course Code"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="term"
            value={searchFilters.term}
            onChange={handleInputChange}
            placeholder="Term (e.g., 24F)"
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleSearch}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {courses.length > 0 && (
        <div className="bg-white p-4 rounded shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Search Results</h2>
          <ul>
            {courses.map((course) => (
              <li
                key={course.CourseID}
                onClick={() => handleCourseClick(course.CourseID)}
                className="cursor-pointer p-2 hover:bg-gray-100 border-b"
              >
                {course.Title} - {course.Code}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">My Applications</h2>
        <ul>
          {applications.map((app) => (
            <li key={app.ApplicationID} className="p-2 border-b">
              {app.CourseTitle} - {app.Status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
