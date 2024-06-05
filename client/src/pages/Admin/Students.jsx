import { MdErrorOutline } from "react-icons/md";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

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
          Add Student
          <img src="/images/add.svg" alt="add user" />
        </button>
      </div>

      {studentsData.length > 0 ? (
        <div className="students-table__container my-10">
          <div className="mb-8 overflow-auto">
            <table className="min-w-full border   ">
              <thead>
                <tr className="whitespace-nowrap shadow-sm border shadow-blue-200">
                  <th className="px-4 py-2 text-left font-bold">#</th>
                  <th className="px-4 py-2 text-left font-bold">USERNAME</th>
                  <th className="px-4 py-2 text-left font-bold">FIRST NAME</th>
                  <th className="px-4 py-2 text-left font-bold">LAST NAME</th>
                  <th className="px-4 py-2 text-left font-bold">EMAIL</th>
                  <th className="px-4 py-2 text-left font-bold">
                    PHONE NUMBER
                  </th>
                  <th className="px-4 py-2 text-left font-bold">GENDER</th>
                  <th className="px-4 py-2 text-left font-bold">
                    ENROLLMENT STATUS
                  </th>
                  <th className="px-4 py-2 text-left font-bold">DEPARTMENT</th>
                  <th className="px-4 py-2 text-left font-bold">PROGRAM</th>
                  <th className="px-4 py-2 text-left font-bold">YEAR LEVEL</th>
                  <th className="px-4 py-2 text-left font-bold">SEMESTER</th>
                  <th className="px-4 py-2 text-left font-bold">SECTION</th>

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
                    <td className="px-4 py-2 ">{student.username}</td>
                    <td className="px-4 py-2">
                      {capitalizeFirstLetter(student.first_name)}{" "}
                    </td>
                    <td className="px-4 py-2">
                      {capitalizeFirstLetter(student.last_name)}{" "}
                    </td>
                    <td className="px-4 py-2">{student.email}</td>
                    <td className="px-4 py-2">{student.phone_number}</td>
                    <td className="px-4 py-2">{student.gender}</td>
                    <td className="px-4 py-2">
                      <span
                        className={
                          student.enrollment_status === "Enrolled"
                            ? "bg-green-200 h-[35px] rounded-md text-green-700   flex items-center justify-center "
                            : "bg-red-200 h-[35px] text-red-700  rounded-md  flex items-center justify-center "
                        }
                      >
                        {student.enrollment_status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {student.department_name
                        ? student.department_name
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {student.program_name ? student.program_name : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {student.year_level ? student.year_level : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {student.semester ? student.semester : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {student.section_name ? student.section_name : "N/A"}
                    </td>

                    <td className="flex h-full items-center gap-2 px-4 py-2">
                      <button className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200 text-sm">
                        Details
                      </button>

                      {student.enrollment_status === "Enrolled" && (
                        <button
                          onClick={() => toggleEditStudentState(student)}
                          className="btn-sm rounded border border-gray-400  h-[35px] px-2  hover:bg-gray-200"
                        >
                          <FaRegEdit color="green" />
                        </button>
                      )}

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
