import React, { useEffect, useState } from "react";
import CourseRegistrationForm from "../../components/Courses/CourseRegistrationForm";
import { MdErrorOutline } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

const Courses = () => {
  const [addCourse, setAddCourse] = useState(false);
  const [courses, setCourses] = useState([]);

  const toggleAddCourseState = () => {
    setAddCourse(!addCourse);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost/student-sphere/server/Courses/coursesByDepartment.php"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array ensures the effect runs only once

  // Function to determine background color based on department name
  const getShadowColor = (departmentName) => {
    switch (departmentName) {
      case "College of Information Technology and Communication":
        return "shadow-[#dac7ff]";
      case "College of Technology":
        return "shadow-[#BAE5F5]";
      case "College of Engineering and Architecture":
        return "shadow-[#fbbfad]";
      case "College of Science Technology and Education":
        return "shadow-[#FDE1AC]";
      case "College of Science and Mathematics":
        return "shadow-[#CCEFBF]";
      default:
        return "shadow-md"; // Default shadow color
    }
  };

  // Function to determine border color based on department name
  const getBorderColor = (departmentName) => {
    switch (departmentName) {
      case "College of Information Technology and Communication":
        return "border-[#dac7ff]";
      case "College of Technology":
        return "border-[#BAE5F5]";
      case "College of Engineering and Architecture":
        return "border-[#fbbfad]";
      case "College of Science Technology and Education":
        return "border-[#FDE1AC]";
      case "College of Science and Mathematics":
        return "border-[#CCEFBF]";
      default:
        return "border-gray-200"; // Default border color
    }
  };

  const totalCourses = courses.reduce(
    (total, department) => total + department.courses.length,
    0
  );

  return (
    <div className="w-full  ml-[320px] ">
      <div className="px-8 py-10 ">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <img src="/images/courses-black.png" alt="courses" />
            <h1 className="text-2xl poppins-medium uppercase ">
              Courses Management
            </h1>
          </div>

          <button
            onClick={toggleAddCourseState}
            className="bg-[#164e8e] text-white h-[40px] rounded-md  px-4 inter flex items-center justify-center gap-3"
          >
            Add Course
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>

        {totalCourses > 0 ? (
          <div className="faculty-members__container my-10">
            {courses.map((department, index) => (
              <div key={index} className="mb-12 ">
                <h2 className="mb-4  poppins-medium text-xl font-bold">
                  {department.department_name}
                </h2>

                <div className="grid grid-cols-3 mt-6 gap-8">
                  {department.courses.map((course, index) => (
                    <div
                      className={`shadow-sm  border ${getBorderColor(
                        department.department_name
                      )}  bg-white ${getShadowColor(
                        department.department_name
                      )}  p-6 rounded-md  `}
                      key={index}
                    >
                      <div className="border-b border-gray-200 pb-3">
                        <h1 className="text-xl  poppins-medium">
                          {course.course_name}
                        </h1>
                      </div>

                      <p className="poppins-regular  mt-4">
                        {course.course_description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full mt-10 flex items-center shadow-md border play-regular text-lg px-4 py-3 font-bold gap-2">
            <MdErrorOutline color="red" />
            <h1>No Courses</h1>
          </div>
        )}

        {addCourse && (
          <CourseRegistrationForm toggleAddCourseState={toggleAddCourseState} />
        )}
      </div>
    </div>
  );
};

export default Courses;
