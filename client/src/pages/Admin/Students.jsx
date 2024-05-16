import React, { useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import StudentRegistrationForm from "../../components/Student/StudentRegistrationForm";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaUsers } from "react-icons/fa";

const Students = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [addStudent, setAddStudent] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost/student-sphere/server/Students/studentsByDepartment.php"
        );
        setStudentsData(response.data);
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.response.data.error);
      }
    };

    fetchStudents();
  }, []); // Empty dependency array ensures the effect runs only once

  const toggleAddStudentState = () => {
    setAddStudent(!addStudent);
  };

  const totalStudents = studentsData.reduce(
    (total, department) => total + department.students.length,
    0
  );

  const deleteStudentHandler = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const formData = new FormData();
        formData.append("student_id", studentId);

        const response = await axios.post(
          "http://localhost/student-sphere/server/Students/deleteStudent.php",
          formData
        );

        toast.success(response.data.message);

        // Update the facultyMembers state to remove the deleted faculty member
        setStudentsData((prevStudents) =>
          prevStudents.map((department) => ({
            ...department,
            students: department.students.filter(
              (student) => student.student_id !== studentId
            ),
          }))
        );
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="w-full  ml-[320px] px-8 overflow-auto  ">
      <div className="flex items-center justify-between  my-10">
        <div className="flex items-center gap-3">
          <FaUsers fontSize={20} />
          <h1 className="text-2xl poppins-medium uppercase ">
            STUDENTS MANAGEMENT
          </h1>
        </div>

        <button
          onClick={toggleAddStudentState}
          className="bg-[#164e8e] text-white h-[40px] rounded-md  px-4 inter flex items-center justify-center gap-3"
        >
          Add Students
          <img src="/images/add.svg" alt="add user" />
        </button>
      </div>

      {totalStudents > 0 ? (
        <div className="students-table__container my-10">
          {studentsData.map((department, index) => (
            <div key={index} className="mb-8 overflow-auto">
              <h2 className="mb-4 play-regular text-xl font-bold">
                {department.department_name}
              </h2>
              <table className="min-w-full border shadow-md">
                <thead className="bg-[#164e8e] text-white">
                  <tr className="whitespace-nowrap shadow-md">
                    <th className="px-4 py-2 text-left font-bold">
                      STUDENT ID
                    </th>
                    <th className="px-4 py-2 text-left font-bold">
                      FIRST NAME
                    </th>
                    <th className="px-4 py-2 text-left font-bold">LAST NAME</th>
                    <th className="px-4 py-2 text-left font-bold">GENDER</th>
                    <th className="px-4 py-2 text-left font-bold">EMAIL</th>
                    <th className="px-4 py-2 text-left font-bold">
                      DATE OF BIRTH
                    </th>
                    <th className="px-4 py-2 text-left font-bold">ADDRESS</th>
                    <th className="px-4 py-2 text-left font-bold">
                      PHONE NUMBER
                    </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {department.students.map((student, index) => (
                    <tr
                      key={index}
                      className="whitespace-nowrap hover:bg-gray-50 border"
                    >
                      <td className="px-4 py-2">{student.student_id}</td>
                      <td className="px-4 py-2">{student.first_name}</td>
                      <td className="px-4 py-2">{student.last_name}</td>
                      <td className="px-4 py-2">{student.gender}</td>
                      <td className="px-4 py-2">{student.email}</td>
                      <td className="px-4 py-2">{student.date_of_birth}</td>
                      <td className="px-4 py-2">{student.address}</td>
                      <td className="px-4 py-2">{student.phone_number}</td>

                      <td className="flex h-full items-center gap-2 px-4 py-2">
                        <Link to={`/admin/user/${student.id}/edit`}>
                          <button className="btn-sm rounded border border-gray-400 p-2 hover:bg-gray-100">
                            <FaRegEdit color="green" />
                          </button>
                        </Link>
                        <button
                          className="btn-sm rounded border border-gray-400 p-2 hover:bg-gray-100"
                          onClick={() =>
                            deleteStudentHandler(student.student_id)
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
          <h1>No Students </h1>
        </div>
      )}

      {addStudent && (
        <StudentRegistrationForm
          toggleAddStudentState={toggleAddStudentState}
        />
      )}
    </div>
  );
};

export default Students;
