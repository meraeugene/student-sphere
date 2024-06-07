import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { FaRegEdit } from "react-icons/fa";
import GradeForm from "../../components/Faculty/GradeForm";
import EditGradeForm from "../../components/Faculty/EditGradeForm";
import { MdErrorOutline } from "react-icons/md";
import StudentGradesModal from "@/components/StudentGradesModal";
import useGradesData from "@/hooks/useGradesData";
import useGradesModalStates from "@/hooks/useGradesModalStates";

const Grades = () => {
  const { students, handleStudentGradesAdded } = useGradesData();

  const {
    addStudentGrade,
    studentToAddGrade,
    editStudentGrade,
    studentToEditGrade,
    showProfileDetailsModal,
    studentDetails,
    toggleAddStudentGradeState,
    toggleEditStudentGradeState,
    showProfileDetailsModalHandler,
    closeProfileDetailsModal,
  } = useGradesModalStates();

  return (
    <div className="w-full ml-[320px] overflow-auto">
      <div className="px-8 py-10">
        <div className="flex items-center gap-2 mb-10">
          <img src="/images/grades-black.svg" alt="grades" />
          <h1 className="text-2xl poppins-medium uppercase ">
            Grades Management
          </h1>
        </div>

        {students.length > 0 ? (
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
                      key={index}
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
                      <td className="px-4 py-2">
                        <span
                          className={
                            student.remarks === "Passed"
                              ? "bg-green-200 h-[35px] rounded-md text-green-700 flex items-center justify-center"
                              : student.remarks === "Failed" ||
                                student.remarks === "Withdrawn" ||
                                student.remarks === "INC"
                              ? "bg-red-200 rounded-md px-4 text-red-700 h-[35px] rounded-m  flex items-center justify-center"
                              : " h-[35px] rounded-md flex items-center justify-center"
                          }
                        >
                          {student.remarks ?? "N/A"}
                        </span>
                      </td>

                      <td className="flex h-full items-center gap-3 px-4 py-2">
                        <button
                          onClick={() =>
                            showProfileDetailsModalHandler(student)
                          }
                          className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200 text-sm"
                        >
                          Details
                        </button>

                        {student.enrollment_status === "Enrolled" && (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                toggleEditStudentGradeState(student)
                              }
                              className="btn-sm rounded border border-gray-400  h-[35px] px-2  hover:bg-gray-200"
                            >
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
                          </div>
                        )}
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
      </div>

      {showProfileDetailsModal && studentDetails && (
        <StudentGradesModal
          data={studentDetails}
          close={closeProfileDetailsModal}
        />
      )}

      {addStudentGrade && (
        <GradeForm
          student={studentToAddGrade}
          toggleAddStudentGradeState={toggleAddStudentGradeState}
          onStudentGradesAdded={handleStudentGradesAdded}
        />
      )}

      {editStudentGrade && (
        <EditGradeForm
          student={studentToEditGrade}
          toggleEditStudentGradeState={toggleEditStudentGradeState}
          onStudentGradesAdded={handleStudentGradesAdded}
        />
      )}
    </div>
  );
};

export default Grades;
