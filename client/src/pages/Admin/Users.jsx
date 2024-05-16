import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import AdminRegistrationForm from "../../components/Admin/AdminRegistrationForm";
import axios from "axios";
import FacultyRegistrationForm from "../../components/Faculty/FacultyRegistrationForm";
import StudentRegistrationForm from "../../components/Student/StudentRegistrationForm";
import { MdErrorOutline } from "react-icons/md";
import { toast } from "react-toastify";

const Users = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [students, setStudents] = useState([]);

  const [addAdmin, setAddAdmin] = useState(false);
  const [addFacultyMember, setAddFacultyMember] = useState(false);
  const [addStudent, setAddStudent] = useState(false);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost/student-sphere/server/Admins/admins.php"
        );
        setAdminUsers(response.data);
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.response.data.error);
      }
    };

    fetchAdminUsers();
  }, []); // Empty dependency array ensures the effect runs only once

  const deleteAdminHandler = async (username) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const formData = new FormData();
        formData.append("username", username);

        const response = await axios.post(
          "http://localhost/student-sphere/server/Admins/deleteAdmin.php",
          formData
        );

        toast.success(response.data.message);
        // Admin deleted successfully, so update the adminUsers state
        setAdminUsers((prevAdminUsers) =>
          prevAdminUsers.filter((admin) => admin.username !== username)
        );
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    const fetchFacultyMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost/student-sphere/server/Faculties/faculties.php"
        );
        setFacultyMembers(response.data);
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.response.data.error);
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
        // Faculty member deleted successfully, so update the facultyMembers state
        setFacultyMembers((prevFacultyMembers) =>
          prevFacultyMembers.filter(
            (facultyMember) => facultyMember.username !== username
          )
        );
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost/student-sphere/server/Students/students.php"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.response.data.error);
      }
    };

    fetchStudents();
  }, []); // Empty dependency array ensures the effect runs only once

  const toggleAddAdminState = () => {
    setAddAdmin(!addAdmin);
  };

  const toggleAddFacultyMemberState = () => {
    setAddFacultyMember(!addFacultyMember);
  };

  const toggleAddStudentState = () => {
    setAddStudent(!addStudent);
  };

  return (
    <div className="w-full ml-[320px] overflow-auto ">
      <div className="px-8 py-10 ">
        <div className="flex items-center gap-3">
          <img src="/images/user-black.svg" alt="users" />
          <h1 className="text-2xl poppins-medium uppercase ">
            Users Management
          </h1>
        </div>

        {/* ADMINS */}
        <div className="flex items-center justify-between  my-10">
          <h1 className="text-2xl poppins-medium uppercase ">ADMINS</h1>
          <button
            onClick={toggleAddAdminState}
            className="bg-[#164e8e] text-white h-[40px] rounded-md  px-4 inter flex items-center justify-center gap-3"
          >
            Add Admin
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>
        <div className="admin-table__container ">
          {adminUsers.length > 0 ? (
            <div className="overflow-auto ">
              <table className=" min-w-full border    shadow-md ">
                <thead className="bg-[#164e8e] text-white">
                  <tr className="whitespace-nowrap shadow-md ">
                    <th className="px-4 py-2  text-left font-bold">USERNAME</th>
                    <th className="px-4 py-2  text-left font-bold">
                      FIRST NAME
                    </th>
                    <th className="px-4 py-2  text-left font-bold">
                      LAST NAME
                    </th>
                    <th className="px-4 py-2  text-left font-bold">EMAIL</th>
                    <th className="px-4 py-2  text-left font-bold">
                      PHONE NUMBER
                    </th>
                    <th className="px-4 py-2  text-left font-bold">GENDER</th>
                    <th className=" px-4  py-2 text-left font-bold">
                      DATE OF BIRTH
                    </th>

                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((user, index) => (
                    <tr
                      key={index}
                      className="whitespace-nowrap  hover:bg-gray-50 border"
                    >
                      <td className="px-4 py-2">{user.username}</td>
                      <td className="px-4 py-2">{user.first_name}</td>
                      <td className="px-4 py-2">{user.last_name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.phone_number}</td>
                      <td className="px-4 py-2">{user.gender}</td>
                      <td className="px-4 py-2">{user.date_of_birth}</td>

                      <td className="flex h-full items-center gap-2 px-4 py-2">
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <button className="btn-sm rounded border border-gray-400 p-2 hover:bg-gray-100">
                            <FaRegEdit color="green" />
                          </button>
                        </Link>
                        <button
                          className="btn-sm rounded border border-gray-400 p-2 hover:bg-gray-100"
                          onClick={() => deleteAdminHandler(user.username)}
                        >
                          <FaTrash color="red" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full flex items-center shadow-md border play-regular text-lg px-4 py-3 font-bold gap-2">
              <MdErrorOutline color="red" />
              <h1> No Admin Users</h1>
            </div>
          )}
        </div>

        {/* FACULTIES */}
        <div className="flex items-center justify-between  my-10">
          <h1 className="text-2xl poppins-medium uppercase ">
            FACULTIES STAFF
          </h1>
          <button
            onClick={toggleAddFacultyMemberState}
            className="bg-[#164e8e] text-white h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3"
          >
            Add Faculty Staff
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>
        <div className="faculty-members-table__container ">
          {facultyMembers.length > 0 ? (
            <div className="overflow-auto ">
              <table className=" min-w-full border    shadow-md ">
                <thead className="bg-[#164e8e] text-white">
                  <tr className="whitespace-nowrap shadow-md ">
                    <th className="px-4 py-2  text-left font-bold">USERNAME</th>
                    <th className="px-4 py-2  text-left font-bold">
                      FIRST NAME
                    </th>
                    <th className="px-4 py-2  text-left font-bold">
                      LAST NAME
                    </th>
                    <th className="px-4 py-2  text-left font-bold">EMAIL</th>
                    <th className="px-4 py-2  text-left font-bold">
                      PHONE NUMBER
                    </th>
                    <th className="px-4 py-2  text-left font-bold">GENDER</th>
                    <th className=" px-4  py-2 text-left font-bold">
                      DATE OF BIRTH
                    </th>
                    <th className=" px-4  py-2 text-left font-bold">
                      FACULTY TYPE
                    </th>
                    <th className=" px-4  py-2 text-left font-bold">
                      DEPARTMENT
                    </th>

                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {facultyMembers.map((facultyMember, index) => (
                    <tr
                      key={index}
                      className="whitespace-nowrap  hover:bg-gray-50 border"
                    >
                      <td className="px-4 py-2">{facultyMember.username}</td>
                      <td className="px-4 py-2">{facultyMember.first_name}</td>
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
                      <td className="px-4 py-2">
                        {facultyMember.department_name}
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
          ) : (
            <div className="w-full flex items-center shadow-md border play-regular text-lg px-4 py-3 font-bold gap-2">
              <MdErrorOutline color="red" />
              <h1> No Faculty Members</h1>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between  my-10">
          <h1 className="text-2xl poppins-medium uppercase ">STUDENTS</h1>
          <button
            onClick={toggleAddStudentState}
            className="bg-[#164e8e] text-white h-[40px] rounded-md  px-4 inter flex items-center justify-center gap-3"
          >
            Add Students
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>
        <div className="student-table__container ">
          {students.length > 0 ? (
            <div className="overflow-auto ">
              <table className=" min-w-full border    shadow-md ">
                <thead className="bg-[#164e8e] text-white">
                  <tr className="whitespace-nowrap shadow-md ">
                    <th className="px-4 py-2  text-left font-bold">
                      STUDENT ID
                    </th>
                    <th className="px-4 py-2  text-left font-bold">
                      FIRST NAME
                    </th>
                    <th className="px-4 py-2  text-left font-bold">
                      LAST NAME
                    </th>
                    <th className="px-4 py-2  text-left font-bold">EMAIL</th>
                    <th className="px-4 py-2  text-left font-bold">
                      PHONE NUMBER
                    </th>
                    <th className="px-4 py-2  text-left font-bold">ADDRESS</th>
                    <th className="px-4 py-2  text-left font-bold">GENDER</th>
                    <th className=" px-4  py-2 text-left font-bold">
                      DATE OF BIRTH
                    </th>
                    <th className=" px-4  py-2 text-left font-bold">
                      DEPARTMENT
                    </th>

                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((user, index) => (
                    <tr
                      key={index}
                      className="whitespace-nowrap  hover:bg-gray-50 border"
                    >
                      <td className="px-4 py-2">{user.student_id}</td>
                      <td className="px-4 py-2">{user.first_name}</td>
                      <td className="px-4 py-2">{user.last_name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.phone_number}</td>
                      <td className="px-4 py-2">{user.address}</td>
                      <td className="px-4 py-2">{user.gender}</td>
                      <td className="px-4 py-2">{user.date_of_birth}</td>
                      <td className="px-4 py-2">{user.department_name}</td>

                      <td className="flex h-full items-center gap-2 px-4 py-2">
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <button className="btn-sm rounded border border-gray-400 p-2 hover:bg-gray-100">
                            <FaRegEdit color="green" />
                          </button>
                        </Link>
                        <button
                          className="btn-sm rounded border border-gray-400 p-2 hover:bg-gray-100"
                          // onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash color="red" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full flex items-center shadow-md border play-regular text-lg px-4 py-3 font-bold gap-2">
              <MdErrorOutline color="red" />
              <h1> No Students</h1>
            </div>
          )}
        </div>

        {addAdmin && (
          <AdminRegistrationForm toggleAddAdminState={toggleAddAdminState} />
        )}

        {addFacultyMember && (
          <FacultyRegistrationForm
            toggleAddFacultyMemberState={toggleAddFacultyMemberState}
          />
        )}

        {addStudent && (
          <StudentRegistrationForm
            toggleAddStudentState={toggleAddStudentState}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
