import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { courses } from "../../../services/apis";
import axios from "axios";

export default function StudentDashboard() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  const fetchTrendingCourses = async () => {
    try {
      const response = await axios.get(courses.COURSES_API);
      // Take the first 3 courses to show as trending
      setTrendingCourses(response.data.data.slice(0, 3));
    } catch (error) {
      console.log("Error fetching trending courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
    fetchTrendingCourses();
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Section */}
      <div className="rounded-lg bg-gradient-to-r from-blue-100 to-indigo-800 p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome, {user?.firstName}!</h1>
        <p className="text-lg">Continue your learning journey today.</p>
      </div>

      {/* Continue Learning Section */}
      <div className="bg-mwhite rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-black mb-6">
          Continue Learning
        </h2>

        {!enrolledCourses ? (
          <div className="flex justify-center">
            <div className="spinner"></div>
          </div>
        ) : !enrolledCourses.length ? (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="text-yellow-700">
              You haven't enrolled in any courses yet.
            </p>
            <button
              onClick={() => navigate("/show-all-courses")}
              className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition duration-300"
            >
              Explore Courses
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Enrolled Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    );
                  }}
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className="text-white font-medium">
                        Progress: {course.progressPercentage || 0}%
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-black mb-2">
                      {course.courseName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {course.courseDescription.length > 100
                        ? `${course.courseDescription.slice(0, 100)}...`
                        : course.courseDescription}
                    </p>
                    <ProgressBar
                      completed={course.progressPercentage || 0}
                      height="8px"
                      isLabelVisible={false}
                      bgColor="#4F46E5"
                    />
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500">
                        Duration: {course?.totalDuration || "N/A"}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* See All Enrolled Courses Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => navigate("/dashboard/enrolled-courses")}
                className="bg-blue-100 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-300"
              >
                See All Enrolled Courses
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Trending Courses Section */}
      <div className="bg-mwhite rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-black mb-6">
          Trending Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingCourses.map((course, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-black mb-2">
                  {course.courseName}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {course.courseDescription?.length > 100
                    ? `${course.courseDescription.slice(0, 100)}...`
                    : course.courseDescription}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-black">
                    ${course.price}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Courses Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/show-all-courses")}
            className="bg-blue-100 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-300"
          >
            Explore All Courses
          </button>
        </div>
      </div>
    </div>
  );
}
