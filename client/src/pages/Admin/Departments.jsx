import React, { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { fetchDepartments } from "../../features/departments/departmentsSlice";
import { useDispatch, useSelector } from "react-redux";
import DepartmentRegistrationForm from "../../components/Admin/Departments/DepartmentRegistrationForm";
import Loader from "../../components/Loader";

const Departments = () => {
  const dispatch = useDispatch();
  const [addDepartment, setAddDepartment] = useState(false);
  const { departments, status } = useSelector((state) => state.departments);

  const toggleAddDepartmentState = () => {
    setAddDepartment(!addDepartment);
  };

  const handleDepartmentAdded = () => {
    dispatch(fetchDepartments());
  };

  return (
    <div className="w-full  ml-[320px]  ">
      <div className="px-8 py-10 ">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <img src="/images/departments-black.svg" alt="departments" />
            <h1 className="text-2xl poppins-medium uppercase ">
              Departments Management
            </h1>
          </div>

          <button
            onClick={toggleAddDepartmentState}
            className="bg-[#164e8e] text-white h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3 hover:bg-[#133e6e] transition-colors duration-300"
          >
            Add Department
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>

        {status === "loading" && <Loader />}

        {status === "failed" && (
          <div className="w-full flex  bg-red-100 rounded-md items-center  border play-regular text-lg px-4 py-3 font-bold gap-2 text-red-800 mt-10">
            <MdErrorOutline color="red" />
            <h1>Failed to fetch departments</h1>
          </div>
        )}

        {status === "succeeded" && (
          <div className="departments__container my-10 ">
            {departments.length > 0 ? (
              <div className=" grid grid-cols-2 gap-6 ">
                {departments.map((department, index) => (
                  <div
                    className={`p-6  shadow-blue-200 shadow-md border hover:shadow-lg  hover:shadow-blue-200 transition-all duration-300 ease-in-out rounded-md`}
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
              <div className="w-full flex  bg-red-100 rounded-md items-center  border play-regular text-lg px-4 py-3 font-bold gap-2 text-red-800 mt-10">
                <MdErrorOutline color="red" />
                <h1>No Departments</h1>
              </div>
            )}

            {addDepartment && (
              <DepartmentRegistrationForm
                toggleAddFacultyMemberState={toggleAddDepartmentState}
                onDepartmentAdded={handleDepartmentAdded}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Departments;
