import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdErrorOutline } from "react-icons/md";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import Loader from "../../components/Loader";
import { FaRegEdit } from "react-icons/fa";
import GradeForm from "../../components/Faculty/GradeForm";
import { fetchGrades } from "../../features/grades/gradesSlice";

const Grades = () => {
  const [addStudentGrade, setAddStudentGrade] = useState(false);
  const [studentToAddGrade, setStudentToAddGrade] = useState({});

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { grades: students, status } = useSelector((state) => state.grades);

  useEffect(() => {
    dispatch(fetchGrades({ facultyId: userInfo.faculty_id }));
  }, [dispatch, userInfo.faculty_id]);

  const toggleAddStudentGradeState = (studentData) => {
    setStudentToAddGrade(studentData);
    setAddStudentGrade(!addStudentGrade);
  };

  const handleStudentGradesAdded = () => {
    dispatch(fetchGrades({ facultyId: userInfo.faculty_id }));
  };

  return (
    <div className="w-full ml-[320px] overflow-auto">
      <div className="px-8 py-10">
        <h1 className="text-2xl poppins-medium uppercase mb-6">
          Grades Management
        </h1>
        {status === "loading" && <Loader />}
        {status === "failed" && (
          <div className="w-full flex bg-red-100 rounded-md items-center border play-regular text-lg px-4 py-3 font-bold gap-2 text-red-800 mt-10">
            <MdErrorOutline color="red" />
            <h1>Failed to fetch students</h1>
          </div>
        )}
        {status === "succeeded" && students.length === 0 && (
          <div className="w-full flex bg-red-100 rounded-md items-center border play-regular text-lg px-4 py-3 font-bold gap-2 text-red-800">
            <MdErrorOutline color="red" />
            <h1>No Students Found</h1>
          </div>
        )}
        {status === "succeeded" && students.length > 0 && (
          <div className="faculty-members-table__container my-10">
            <div className="mb-8 overflow-auto">
              <table className="min-w-full border shadow-sm">
                <thead>
                  <tr className="whitespace-nowrap shadow-sm border shadow-blue-200">
                    <th className="px-4 py-2 text-left font-bold">#</th>
                    <th className="px-4 py-2 text-left font-bold">
                      STUDENT ID
                    </th>
                    <th className="px-4 py-2 text-left font-bold">NAME</th>
                    <th className="px-4 py-2 text-left font-bold">GENDER</th>
                    <th className="px-4 py-2 text-left font-bold">EMAIL</th>
                    <th className="px-4 py-2 text-left font-bold">
                      CONTACT NUMBER
                    </th>
                    <th className="px-4 py-2 text-left font-bold">
                      ENROLLMENT STATUS
                    </th>
                    <th className="px-4 py-2 text-left font-bold">PROGRAM</th>
                    <th className="px-4 py-2 text-left font-bold">SEMESTER</th>
                    <th className="px-4 py-2 text-left font-bold">
                      YEAR LEVEL
                    </th>
                    <th className="px-4 py-2 text-left font-bold">SECTION</th>
                    <th className="px-4 py-2 text-left font-bold">SUBJECT</th>
                    <th className="px-4 py-2 text-left font-bold">MIDTERM</th>
                    <th className="px-4 py-2 text-left font-bold">FINAL</th>
                    <th className="px-4 py-2 text-left font-bold">REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student.student_id}
                      className="whitespace-nowrap border hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{student.username}</td>
                      <td className="px-4 py-2">
                        {capitalizeFirstLetter(student.first_name)}{" "}
                        {capitalizeFirstLetter(student.last_name)}
                      </td>

                      <td className="px-4 py-2">{student.gender}</td>
                      <td className="px-4 py-2">{student.email}</td>
                      <td className="px-4 py-2">{student.phone_number}</td>
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
                      <td className="px-4 py-2">{student.program_name}</td>
                      <td className="px-4 py-2">{student.semester}</td>
                      <td className="px-4 py-2">{student.year_level}</td>
                      <td className="px-4 py-2">{student.section_name}</td>
                      <td className="px-4 py-2">
                        <span className="font-semibold">
                          {student.subject_code}
                        </span>{" "}
                        - {student.subject_name}
                      </td>
                      <td className="px-4 py-2">
                        {student.midterm_grade ?? "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {student.final_grade ?? "N/A"}
                      </td>
                      <td className="px-4 py-2">{student.remarks ?? "N/A"}</td>

                      <td className="flex h-full items-center gap-3 px-4 py-2">
                        <button className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200 text-sm">
                          Details
                        </button>

                        {student.enrollment_status === "Enrolled" && (
                          <div className="flex items-center gap-3">
                            <button className="btn-sm rounded border border-gray-400  h-[35px] px-2  hover:bg-gray-200">
                              <FaRegEdit color="green" />
                            </button>

                            <button
                              onClick={() =>
                                toggleAddStudentGradeState(student)
                              }
                              className="btn-sm text-sm bg-green-200 text-green-700  border-none  poppins-regular rounded h-[35px] px-2 outline-none hover:opacity-90 font-semibold hover:bg-green-300 "
                            >
                              ADD GRADES
                            </button>

                            <button className="btn-sm text-sm bg-red-400 hover:bg-red-500  border-none text-white poppins-regular rounded h-[35px] px-2 outline-none hover:opacity-90 ">
                              DROP STUDENT
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {addStudentGrade && (
        <GradeForm
          student={studentToAddGrade}
          toggleAddStudentGradeState={toggleAddStudentGradeState}
          onStudentGradesAdded={handleStudentGradesAdded}
        />
      )}
    </div>
  );
};

export default Grades;
