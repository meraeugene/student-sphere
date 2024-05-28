import React, { useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import StudentRegistrationForm from "../../components/Student/StudentRegistrationForm";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStudent,
  fetchStudents,
} from "../../features/students/studentsSlice";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import EditStudentForm from "../../components/Student/EditStudentForm";

const Students = () => {
  const [addStudent, setAddStudent] = useState(false);
  const [editStudent, setEditStudent] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState({});

  const dispatch = useDispatch();
  const studentsData = useSelector((state) => state.students.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const deleteStudentHandler = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await dispatch(deleteStudent(studentId)).unwrap();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const toggleAddStudentState = () => {
    setAddStudent(!addStudent);
  };

  const handleStudentAdded = () => {
    dispatch(fetchStudents());
  };

  const toggleEditStudentState = (studentData) => {
    setStudentToEdit(studentData);
    setEditStudent(!editStudent);
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
          className="bg-[#164e8e] text-white h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3 hover:bg-[#133e6e] transition-colors duration-300"
        >
          Add Students
          <img src="/images/add.svg" alt="add user" />
        </button>
      </div>

      {studentsData.length > 0 ? (
        <div className="students-table__container my-10">
          <div className="mb-8 overflow-auto">
            <table className="min-w-full border   ">
              <thead>
                <tr className="whitespace-nowrap shadow-sm border shadow-blue-200">
                  <th className="px-4 py-2 text-left font-bold">NUMBER</th>
                  <th className="px-4 py-2 text-left font-bold">STUDENT ID</th>
                  <th className="px-4 py-2 text-left font-bold">FIRST NAME</th>
                  <th className="px-4 py-2 text-left font-bold">LAST NAME</th>
                  <th className="px-4 py-2 text-left font-bold">EMAIL</th>
                  <th className="px-4 py-2 text-left font-bold">
                    PHONE NUMBER
                  </th>
                  <th className="px-4 py-2 text-left font-bold">GENDER</th>
                  <th className="px-4 py-2 text-left font-bold">
                    DEPARTMENT NAME
                  </th>

                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((student, index) => (
                  <tr
                    key={index}
                    className="whitespace-nowrap border  hover:bg-gray-50  "
                  >
                    <td className="px-4 py-2 ">{index + 1}</td>
                    <td className="px-4 py-2 ">{student.student_id}</td>
                    <td className="px-4 py-2">
                      {capitalizeFirstLetter(student.first_name)}{" "}
                    </td>
                    <td className="px-4 py-2">
                      {capitalizeFirstLetter(student.last_name)}{" "}
                    </td>
                    <td className="px-4 py-2">{student.email}</td>
                    <td className="px-4 py-2">{student.phone_number}</td>
                    <td className="px-4 py-2">{student.gender}</td>
                    <td className="px-4 py-2">{student.department_name}</td>

                    <td className="flex h-full items-center gap-2 px-4 py-2">
                      <button className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200 text-sm">
                        Details
                      </button>

                      <button
                        onClick={() => toggleEditStudentState(student)}
                        className="btn-sm rounded border border-gray-400  h-[35px] px-2  hover:bg-gray-200"
                      >
                        <FaRegEdit color="green" />
                      </button>

                      <button
                        className="btn-sm rounded border border-gray-400  h-[35px] px-2  hover:bg-gray-200"
                        onClick={() => deleteStudentHandler(student.student_id)}
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
          <h1>No Students</h1>
        </div>
      )}

      {addStudent && (
        <StudentRegistrationForm
          toggleAddStudentState={toggleAddStudentState}
          onStudentAdded={handleStudentAdded}
        />
      )}

      {editStudent && (
        <EditStudentForm
          student={studentToEdit}
          toggleEditStudentState={toggleEditStudentState}
          onStudentAdded={handleStudentAdded}
        />
      )}
    </div>
  );
};

export default Students;
