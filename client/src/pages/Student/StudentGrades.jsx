import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentGrades } from "../../features/grades/gradesSlice";
import { MdErrorOutline } from "react-icons/md";

const StudentGrades = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { studentGrades } = useSelector((state) => state.grades);

  useEffect(() => {
    dispatch(fetchStudentGrades({ studentId: userInfo.student_id }));
  }, [dispatch, userInfo.faculty_id]);

  return (
    <div className="w-full ml-[320px] overflow-auto">
      <div className="px-8 py-10">
        <h1 className="text-2xl poppins-medium uppercase mb-6">
          Report of Grades
        </h1>

        {studentGrades.length > 0 ? (
          <div className="faculty-members-table__container my-10">
            <div className="mb-8 overflow-auto">
              <table className="min-w-full border shadow-sm">
                <thead>
                  <tr className="whitespace-nowrap shadow-sm border shadow-blue-200">
                    <th className="px-4 py-2 text-left font-bold">#</th>
                    <th className="px-4 py-2 text-left font-bold">CODE</th>
                    <th className="px-4 py-2 text-left font-bold">
                      DESCRIPTIVE
                    </th>
                    <th className="px-4 py-2 text-center font-bold">UNITS</th>
                    <th className="px-4 py-2 text-left font-bold">SECTION</th>
                    <th className="px-4 py-2 text-left font-bold">MIDTERM</th>
                    <th className="px-4 py-2 text-left font-bold">FINAL</th>
                    <th className="px-4 py-2 text-left font-bold">REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  {studentGrades.map((studentGrade, index) => (
                    <tr
                      key={index}
                      className="whitespace-nowrap border hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{studentGrade.subject_code}</td>
                      <td className="px-4 py-2">{studentGrade.subject_name}</td>
                      <td className="px-4 py-2 text-center">
                        {studentGrade.unit}
                      </td>
                      <td className="px-4 py-2">{studentGrade.section_name}</td>
                      <td className="px-4 py-2">
                        {studentGrade.midterm_grade ?? ""}
                      </td>
                      <td className="px-4 py-2">
                        {studentGrade.final_grade ?? ""}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={
                            studentGrade.remarks === "Passed"
                              ? "bg-green-200 h-[35px] rounded-md text-green-700 flex items-center justify-center"
                              : studentGrade.remarks === "Failed" ||
                                studentGrade.remarks === "Withdrawn" ||
                                studentGrade.remarks === "INC"
                              ? "bg-red-200 rounded-md px-4 text-red-700 h-[35px] rounded-m  flex items-center justify-center"
                              : " h-[35px] rounded-md "
                          }
                        >
                          {studentGrade.remarks ?? "Not Yet Posted"}
                        </span>
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
            <h1>No Grades</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentGrades;
