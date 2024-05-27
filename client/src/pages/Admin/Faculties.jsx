import React, { useState } from "react";
import { GiTeacher } from "react-icons/gi";
import { MdErrorOutline } from "react-icons/md";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import FacultyRegistrationForm from "../../components/Faculty/FacultyRegistrationForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFaculty,
  fetchFaculties,
} from "../../features/faculties/facultiesSlice";
import EditFacultyForm from "../../components/Faculty/EditFacultyForm";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { useSearchParams } from "react-router-dom";

const Faculties = () => {
  const [addFacultyMember, setAddFacultyMember] = useState(false);
  const [editFacultyMember, setEditFacultyMember] = useState(false);
  const [facultyMemberToEdit, setFacultyMemberToEdit] = useState({});
  const [searchParams, setSearchParams] = useSearchParams({
    departmentName: "",
  });

  const departmentName = searchParams.get("departmentName");

  const dispatch = useDispatch();
  const facultyMembers = useSelector((state) => state.faculties.faculties);

  const deleteFacultyMemberHandler = async (facultyId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(deleteFaculty(facultyId)).unwrap();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleFacultyAdded = () => {
    dispatch(fetchFaculties());
  };

  const toggleAddFacultyMemberState = () => {
    setAddFacultyMember(!addFacultyMember);
  };

  const toggleEditFacultyMemberState = (facultyMemberData) => {
    setFacultyMemberToEdit(facultyMemberData);
    setEditFacultyMember(!editFacultyMember);
  };

  return (
    <div className="w-full ml-[300px] overflow-hidden">
      <div className="px-8 py-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <GiTeacher fontSize={24} />
            <h1 className="text-2xl poppins-medium uppercase">
              Faculties Management
            </h1>
          </div>

          <button
            onClick={toggleAddFacultyMemberState}
            className="bg-[#164e8e] text-white h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3 hover:bg-[#133e6e] transition-colors duration-300"
          >
            Add Faculty Staff
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>

        {facultyMembers.length > 0 ? (
          <div className="faculty-members-table__container my-10">
            <div className="mb-8 overflow-auto">
              <table className="min-w-full border shadow-sm   ">
                <thead>
                  <tr className="whitespace-nowrap shadow-sm border shadow-blue-200">
                    <th className="px-4 py-2 text-left font-bold">NUMBER</th>
                    <th className="px-4 py-2 text-left font-bold">
                      FACULTY ID
                    </th>
                    <th className="px-4 py-2 text-left font-bold">
                      FIRST NAME
                    </th>
                    <th className="px-4 py-2 text-left font-bold">LAST NAME</th>
                    <th className="px-4 py-2 text-left font-bold">EMAIL</th>

                    <th className="px-4 py-2 text-left font-bold">GENDER</th>
                    <th className="px-4 py-2 text-left font-bold">
                      DEPARTMENT
                    </th>
                    <th className="px-4 py-2 text-left font-bold">PROGRAM</th>
                    <th className="px-4 py-2 text-left font-bold">SECTIONS</th>
                    <th className="px-4 py-2 text-left font-bold">SUBJECTS</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {facultyMembers.map((facultyMember, index) => (
                    <tr
                      key={index}
                      className="whitespace-nowrap border  hover:bg-gray-50  "
                    >
                      <td className="px-4 py-2 ">{index + 1}</td>
                      <td className="px-4 py-2 ">{facultyMember.faculty_id}</td>
                      <td className="px-4 py-2">
                        {facultyMember?.first_name &&
                          capitalizeFirstLetter(facultyMember.first_name)}
                      </td>
                      <td className="px-4 py-2">
                        {facultyMember?.last_name &&
                          capitalizeFirstLetter(facultyMember.last_name)}
                      </td>
                      <td className="px-4 py-2">{facultyMember.email}</td>
                      <td className="px-4 py-2">{facultyMember.gender}</td>
                      <td className="px-4 py-2">
                        {facultyMember.department_name}
                      </td>
                      <td className="px-4 py-2">
                        {facultyMember.program_name}
                      </td>
                      <td className="px-4 py-2">
                        {facultyMember.section_name ? (
                          <span>{facultyMember.section_name}</span>
                        ) : (
                          <span className="bg-orange-200 h-[35px] px-2 text-orange-500  rounded-md  flex items-center justify-center ">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {facultyMember.subject_name ? (
                          <span>{facultyMember.subject_name}</span>
                        ) : (
                          <span className="bg-orange-200 h-[35px] px-2 text-orange-500  rounded-md  flex items-center justify-center ">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="flex h-full items-center gap-2 px-4 py-2">
                        <button className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200 text-sm">
                          Details
                        </button>
                        <button
                          onClick={() =>
                            toggleEditFacultyMemberState(facultyMember)
                          }
                          className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200"
                        >
                          <FaRegEdit color="green" />
                        </button>
                        <button
                          className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200"
                          onClick={() =>
                            deleteFacultyMemberHandler(facultyMember.faculty_id)
                          }
                        >
                          <FaTrash color="red" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-full flex  bg-red-100 rounded-md items-center  border play-regular text-lg px-4 py-3 font-bold gap-2 text-red-800">
            <MdErrorOutline color="red" />
            <h1>No Faculty Members</h1>
          </div>
        )}

        {addFacultyMember && (
          <FacultyRegistrationForm
            toggleAddFacultyMemberState={toggleAddFacultyMemberState}
            onFacultyAdded={handleFacultyAdded}
          />
        )}

        {editFacultyMember && (
          <EditFacultyForm
            facultyMember={facultyMemberToEdit}
            toggleEditFacultyMemberState={toggleEditFacultyMemberState}
            onFacultyMemberAdded={handleFacultyAdded}
          />
        )}
      </div>
    </div>
  );
};

export default Faculties;
