import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restfulGet } from '../../request/request';

const ProfessionalDashboard = () => {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    institution: '',
    courseCode: '',
    term: '',
  });
  const [options, setOptions] = useState({
    institutionOptions: [],
    termOptions: [],
  });
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const institutionOptions = JSON.parse(localStorage.getItem('institutionOptions')) || [];
    const termOptions = JSON.parse(localStorage.getItem('termOptions')) || [];

    setOptions({
      institutionOptions,
      termOptions,
    });

    console.log('Loaded options:', { institutionOptions, termOptions });

    handleSearch()
  }, []);

  const handleSearch = async () => {
    const response = await restfulGet('/professional/dashboard', searchFilters);
    const res = await response.json();
    console.log(res);
    if (res.code === 0) {
      setCourses(res.data.courses);
      setApplications(res.data.applications);
    }
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
          {/* Institution Dropdown */}
          <select
            name="institution"
            value={searchFilters.institution}
            onChange={handleInputChange}
            className="border p-2 rounded"
          >
            <option value="">Select Institution</option>
            {options.institutionOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Course Code Input */}
          <input
            type="text"
            name="courseCode"
            value={searchFilters.courseCode}
            onChange={handleInputChange}
            placeholder="Course Code"
            className="border p-2 rounded"
          />

          {/* Term Dropdown */}
          <select
            name="term"
            value={searchFilters.term}
            onChange={handleInputChange}
            className="border p-2 rounded"
          >
            <option value="">Select Term</option>
            {options.termOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
                key={course.courseId}
                onClick={() => handleCourseClick(course.courseId)}
                className="cursor-pointer p-2 hover:bg-gray-100 border-b"
              >
                {course.title} - {course.code} - {course.term}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">My Applications</h2>
        <ul>
          {applications.map((app) => (
            <li key={app.applicationID} className="p-2 border-b">
              {app.courseTitle} - {app.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
