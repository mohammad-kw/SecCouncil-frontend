import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiconnector"; // Assuming you have this to make API calls
import { courseEndpoints } from "../services/apis"; // Importing the endpoint
import CourseSlider from "../components/core/Catalog/CourseSlider"; // Import the CourseSlider component

const ShowAllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Function to fetch all courses
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await apiConnector(
          "GET",
          courseEndpoints.GET_ALL_COURSE_API
        );
        if (response?.data?.data) {
          setCourses(response.data.data); // Storing the fetched courses in state
        }
      } catch (err) {
        setError("Failed to fetch courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="showAllCoursesPage container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">All Courses</h1>

      {/* Show loading indicator */}
      {loading ? (
        <p className="text-center">Loading courses...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        // If courses are fetched, display them using CourseSlider
        <CourseSlider Courses={courses} />
      )}
    </div>
  );
};

export default ShowAllCoursesPage;
