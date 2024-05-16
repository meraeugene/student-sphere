import React, { useEffect } from "react";
import { useState } from "react";
import DepartmentRegistrationForm from "../../components/Departments/DepartmentRegistrationForm";
import axios from "axios";
import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";

const Departments = () => {
  const [addDepartment, setAddDepartment] = useState(false);
  const [departments, setDepartments] = useState([]);

  const toggleAddDepartmentState = () => {
    setAddDepartment(!addDepartment);
  };

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

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost/student-sphere/server/Departments/departments.php"
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchDepartments();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="w-full  ml-[320px]  ">
      <div className="px-8 py-10 ">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <img src="/images/departments-black.svg" alt="departments" />
            <h1 className="text-2xl poppins-medium uppercase ">
              Departments Management
            </h1>
          </div>

          <button
            onClick={toggleAddDepartmentState}
            className="bg-[#164e8e] text-white h-[40px] rounded-md  px-4 inter flex items-center justify-center gap-3"
          >
            Add Department
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>

        <div className="faculty-members__container my-10 ">
          {departments.length > 0 ? (
            <div className=" grid grid-cols-2 gap-6 ">
              {departments.map((department, index) => (
                <div
                  className={`p-6  shadow-sm  ${getBorderColor(
                    department.department_name
                  )}  border ${getShadowColor(
                    department.department_name
                  )} rounded-md`}
                  key={index}
                >
                  <div className="border-b border-gray-400 pb-3">
                    <h1 className="text-xl  poppins-medium">
                      {department.department_name}
                    </h1>
                  </div>

                  <div className="flex justify-between gap-4   mt-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <FaUser fontSize={14} />
                        <h1 className="poppins-regular  text-gray-600 text-lg ">
                          Department Head:{" "}
                          <span className="poppins-medium text-gray-800">
                            {department.department_head}
                          </span>
                        </h1>
                      </div>
                      <div className="flex items-center gap-3">
                        <MdLocationPin fontSize={14} />
                        <h1 className="poppins-regular text-gray-600  text-lg ">
                          Department Location:{" "}
                          <span className="poppins-medium text-gray-800">
                            {department.department_location}
                          </span>
                        </h1>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <GiTeacher fontSize={20} />
                        <h1 className="poppins-regular  text-gray-600 text-lg ">
                          Total Faculty Staff:{" "}
                          <span className="poppins-medium text-gray-800">
                            {department.total_faculty}
                          </span>
                        </h1>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaUsers fontSize={20} />

                        <h1 className="poppins-regular text-gray-600  text-lg ">
                          Total Students:{" "}
                          <span className="poppins-medium text-gray-800">
                            {department.total_students}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex items-center shadow-md border play-regular text-lg px-4 py-3 font-bold gap-2">
              <MdErrorOutline color="red" />
              <h1> No Deparments</h1>
            </div>
          )}
        </div>

        {addDepartment && (
          <DepartmentRegistrationForm
            toggleAddDepartmentState={toggleAddDepartmentState}
          />
        )}
      </div>
    </div>
  );
};

export default Departments;
