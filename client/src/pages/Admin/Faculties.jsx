import React, { useEffect, useState } from "react";
import { GiTeacher } from "react-icons/gi";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import FacultyRegistrationForm from "../../components/Faculty/FacultyRegistrationForm";
import { toast } from "react-toastify";

const Faculties = () => {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [addFacultyMember, setAddFacultyMember] = useState(false);

  const toggleAddFacultyMemberState = () => {
    setAddFacultyMember(!addFacultyMember);
  };

  useEffect(() => {
    const fetchFacultyMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost/student-sphere/server/Faculties/facultiesByDepartment.php"
        );
        setFacultyMembers(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFacultyMembers();
  }, []); // Empty dependency array ensures the effect runs only once

  const deleteFacultyMemberHandler = async (username) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const formData = new FormData();
        formData.append("username", username);

        const response = await axios.post(
          "http://localhost/student-sphere/server/Faculties/deleteFaculty.php",
          formData
        );

        toast.success(response.data.message);

        // Update the facultyMembers state to remove the deleted faculty member
        setFacultyMembers((prevFacultyMembers) =>
          prevFacultyMembers.map((department) => ({
            ...department,
            faculty_members: department.faculty_members.filter(
              (facultyMember) => facultyMember.username !== username
            ),
          }))
        );
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const totalFacultyMembers = facultyMembers.reduce(
    (total, department) => total + department.faculty_members.length,
    0
  );

  return (
    <div className="w-full ml-[320px]">
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
            className="bg-[#164e8e] text-white h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3"
          >
            Add Faculty Staff
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>

        {totalFacultyMembers > 0 ? (
          <div className="faculty-members-table__container my-10">
            {facultyMembers.map((department, index) => (
              <div key={index} className="mb-8 overflow-auto">
                <h2 className="mb-4 play-regular text-xl font-bold">
                  {department.department_name}
                </h2>
                <table className="min-w-full border shadow-md">
                  <thead className="bg-[#164e8e] text-white">
                    <tr className="whitespace-nowrap shadow-md">
                      <th className="px-4 py-2 text-left font-bold">
                        USERNAME
                      </th>
                      <th className="px-4 py-2 text-left font-bold">
                        FIRST NAME
                      </th>
                      <th className="px-4 py-2 text-left font-bold">
                        LAST NAME
                      </th>
                      <th className="px-4 py-2 text-left font-bold">EMAIL</th>
                      <th className="px-4 py-2 text-left font-bold">
                        PHONE NUMBER
                      </th>
                      <th className="px-4 py-2 text-left font-bold">GENDER</th>
                      <th className="px-4 py-2 text-left font-bold">
                        DATE OF BIRTH
                      </th>
                      <th className="px-4 py-2 text-left font-bold">
                        FACULTY TYPE
                      </th>

                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {department.faculty_members.map((facultyMember, index) => (
                      <tr
                        key={index}
                        className="whitespace-nowrap hover:bg-gray-50 border"
                      >
                        <td className="px-4 py-2">{facultyMember.username}</td>
                        <td className="px-4 py-2">
                          {facultyMember.first_name}
                        </td>
                        <td className="px-4 py-2">{facultyMember.last_name}</td>
                        <td className="px-4 py-2">{facultyMember.email}</td>
                        <td className="px-4 py-2">
                          {facultyMember.phone_number}
                        </td>
                        <td className="px-4 py-2">{facultyMember.gender}</td>
                        <td className="px-4 py-2">
                          {facultyMember.date_of_birth}
                        </td>
                        <td className="px-4 py-2">
                          {facultyMember.faculty_type}
                        </td>

                        <td className="flex h-full items-center gap-2 px-4 py-2">
                          <Link to={`/admin/user/${facultyMember.id}/edit`}>
                            <button className="btn-sm rounded border border-gray-400 p-2 hover:bg-gray-100">
                              <FaRegEdit color="green" />
                            </button>
                          </Link>
                          <button
                            className="btn-sm rounded border border-gray-400 p-2 hover:bg-gray-100"
                            onClick={() =>
                              deleteFacultyMemberHandler(facultyMember.username)
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
            ))}
          </div>
        ) : (
          <div className="w-full flex items-center shadow-md border play-regular text-lg px-4 py-3 font-bold gap-2">
            <MdErrorOutline color="red" />
            <h1>No Faculty Members</h1>
          </div>
        )}

        {addFacultyMember && (
          <FacultyRegistrationForm
            toggleAddFacultyMemberState={toggleAddFacultyMemberState}
          />
        )}
      </div>
    </div>
  );
};

export default Faculties;
