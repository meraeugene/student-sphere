import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentSubjectsEnrolled } from "../../features/subjects/subjectsSlice";

const StudentEnrolledSubjects = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { studentSubjectsEnrolled } = useSelector((state) => state.subjects);

  useEffect(() => {
    dispatch(fetchStudentSubjectsEnrolled({ studentId: userInfo.student_id }));
  }, [dispatch, userInfo.faculty_id]);

  console.log(studentSubjectsEnrolled);

  return (
    <div className="w-full ml-[320px] overflow-auto">
      <div className="px-8 py-10">
        <h1 className="text-2xl poppins-medium uppercase mb-6">
          Subjects Enrolled
        </h1>

        {studentSubjectsEnrolled.length > 0 ? (
          <div className="faculty-members-table__container my-10">
            <div className="mb-8 overflow-auto">
              <table className="min-w-full border shadow-sm">
                <thead>
                  <tr className="whitespace-nowrap shadow-sm border shadow-blue-200">
                    <th className="px-4 py-2 text-left font-bold">#</th>
                    <th className="px-4 py-2 text-left font-bold">CODE</th>
                    <th className="px-4 py-2 text-left font-bold">
                      DESCRIPTION
                    </th>
                    <th className="px-4 py-2  font-bold text-center">UNITS</th>
                    <th className="px-4 py-2 text-left font-bold">SECTION</th>
                    <th className="px-4 py-2 text-left font-bold">SCHEDULE</th>
                    <th className="px-4 py-2 text-left font-bold">TEACHER</th>
                    <th className="px-4 py-2 text-left font-bold">EMAIL</th>
                  </tr>
                </thead>
                <tbody>
                  {studentSubjectsEnrolled.map((subject, index) => (
                    <tr
                      key={index}
                      className="whitespace-nowrap border hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{subject.subject_code}</td>
                      <td className="px-4 py-2">{subject.subject_name}</td>
                      <td className="px-4 py-2 text-center">{subject.unit}</td>
                      <td className="px-4 py-2">{subject.section_name}</td>
                      <td className="px-4 py-2">{subject.schedule}</td>
                      <td className="px-4 py-2">{subject.teacher}</td>
                      <td className="px-4 py-2">{subject.faculty_email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-full flex  bg-red-100 rounded-md items-center  border play-regular text-lg px-4 py-3 font-bold gap-2 text-red-800">
            <MdErrorOutline color="red" />
            <h1>No Enrolled Subjects</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentEnrolledSubjects;
