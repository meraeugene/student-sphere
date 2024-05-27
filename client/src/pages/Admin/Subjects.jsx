import React, { useState } from "react";
import SubjectRegistrationForm from "../../components/Subjects/SubjectRegistrationForm";
import EditSubjectForm from "../../components/Subjects/EditSubjectForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubject,
  fetchSubjects,
} from "../../features/subjects/subjectsSlice";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

const Subjects = () => {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects.subjects);

  const [addSubject, setAddSubject] = useState(false);
  const [editSubject, setEditSubject] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState({});

  const deleteSubjectHandler = async (subjectCode) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        await dispatch(deleteSubject(subjectCode)).unwrap();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const toggleAddSubjectState = () => {
    setAddSubject(!addSubject);
  };

  const toggleEditSubjectState = (subject) => {
    setSubjectToEdit(subject);
    setEditSubject(!editSubject);
  };

  const handleSubjectAdded = () => {
    dispatch(fetchSubjects());
  };

  return (
    <div className="w-full  ml-[300px] ">
      <div className="px-8 py-10 ">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <img src="/images/subjects-black.svg" alt="subjects" />
            <h1 className="text-2xl poppins-medium uppercase ">
              Subjects Management
            </h1>
          </div>

          <button
            onClick={toggleAddSubjectState}
            className="bg-[#164e8e] text-white h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3 hover:bg-[#133e6e] transition-colors duration-300"
          >
            Add Subject
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>

        {subjects.length > 0 ? (
          <div className="faculty-members-table__container my-10">
            <div className="mb-8 overflow-auto">
              <table className="min-w-full border shadow-sm   ">
                <thead>
                  <tr className="whitespace-nowrap shadow-sm border shadow-blue-200">
                    <th className="px-4 py-2 text-left font-bold">NUMBER</th>
                    <th className="px-4 py-2 text-left font-bold">
                      SUBJECT CODE
                    </th>
                    <th className="px-4 py-2 text-left font-bold">
                      SUBJECT NAME
                    </th>
                    <th className="px-4 py-2 text-center font-bold">STATUS</th>
                    <th className="px-4 py-2 text-center font-bold">HOURS</th>
                    <th className="px-4 py-2 text-center font-bold">UNIT</th>
                    <th className="px-4 py-2 text-center font-bold">
                      YEAR LEVEL
                    </th>
                    <th className="px-4 py-2 text-center font-bold">
                      SEMESTER
                    </th>
                    <th className="px-4 py-2 text-left font-bold">PROGRAM</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr
                      key={index}
                      className="whitespace-nowrap border  hover:bg-gray-50  "
                    >
                      <td className="px-4 py-2 ">{index + 1}</td>
                      <td className="px-4 py-2 ">{subject.subject_code}</td>
                      <td className="px-4 py-2">{subject.subject_name}</td>
                      <td className="px-4 py-2">
                        <span
                          className={
                            subject.status === "Active"
                              ? "bg-green-200 h-[35px] rounded-md text-green-700   flex items-center justify-center "
                              : "bg-red-200 h-[35px] text-red-700  rounded-md  flex items-center justify-center "
                          }
                        >
                          {subject.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center">{subject.hours}</td>
                      <td className="px-4 py-2 text-center">{subject.unit}</td>
                      <td className="px-4 py-2 text-center">
                        {subject.year_level}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {subject.semester}
                      </td>
                      <td className="px-4 py-2">{subject.program_name}</td>
                      <td className="flex h-full items-center gap-2 px-4 py-2">
                        <button
                          onClick={() => toggleEditSubjectState(subject)}
                          className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200"
                        >
                          <FaRegEdit color="green" />
                        </button>
                        <button
                          className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200"
                          onClick={() =>
                            deleteSubjectHandler(subject.subject_code)
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
          <div className="w-full flex  bg-red-100 rounded-md items-center  border play-regular text-lg px-4 py-3 font-bold gap-2 text-red-800 mt-10">
            <MdErrorOutline color="red" />
            <h1>No Subject</h1>
          </div>
        )}

        {addSubject && (
          <SubjectRegistrationForm
            toggleAddSubjectState={toggleAddSubjectState}
            onSubjectAdded={handleSubjectAdded}
          />
        )}

        {editSubject && (
          <EditSubjectForm
            subject={subjectToEdit}
            toggleEditSubjectState={toggleEditSubjectState}
            onSubjectAdded={handleSubjectAdded}
          />
        )}
      </div>
    </div>
  );
};

export default Subjects;
