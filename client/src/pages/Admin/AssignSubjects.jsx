import { useSelector } from "react-redux";
import { useState } from "react";
import AssignSubjectsRegisterForm from "../../components/AssignSubjects/AssignSubjectsRegisterForm";

const AssignSubjects = () => {
  const facultyMembers = useSelector((state) => state.faculties.faculties);
  const subjects = useSelector((state) => state.subjects.subjects);
  const [selectedFaculty, setSelectedFaculty] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [assignSubject, setAssignSubject] = useState(false);

  const toggleAssignSubjectState = () => {
    setAssignSubject(!assignSubject);
  };

  const handleFacultyCheckboxChange = (facultyId) => {
    setSelectedFaculty((prevSelected) =>
      prevSelected.includes(facultyId)
        ? prevSelected.filter((id) => id !== facultyId)
        : [...prevSelected, facultyId]
    );
  };

  const handleSubjectCheckboxChange = (subjectCode) => {
    setSelectedSubjects((prevSelected) =>
      prevSelected.includes(subjectCode)
        ? prevSelected.filter((code) => code !== subjectCode)
        : [...prevSelected, subjectCode]
    );
  };

  return (
    <div className="w-full ml-[300px]">
      <div className="px-8 pt-10 pb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3">
              <img src="/images/subjects-black.svg" alt="subjects" />
              <h1 className="text-2xl poppins-medium uppercase">
                Assign Subjects to Faculty Members
              </h1>
            </div>
            <p className="poppins-regular mt-2 text-gray-700">
              Select a faculty member and assign subjects from the available
              list.
            </p>
          </div>

          <button
            onClick={toggleAssignSubjectState}
            className="bg-[#164e8e] text-white h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3 hover:bg-[#133e6e] transition-colors duration-300"
          >
            Assign Subjects
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>

        <div className="flex gap-16 mt-10">
          <div className="basis-[45%]">
            <h1 className="text-xl poppins-regular">Faculty Members List</h1>
            <div className="grid grid-cols-1 gap-8 mt-8">
              {facultyMembers.map((facultyMember) => (
                <label
                  key={facultyMember.faculty_id}
                  className={`shadow-md border transition-all duration-300 ease-in-out rounded-md p-4 flex justify-between ${
                    selectedFaculty.includes(facultyMember.faculty_id)
                      ? "shadow-lg shadow-blue-300"
                      : "hover:shadow-lg"
                  }`}
                >
                  <div>
                    <h1 className="text-lg poppins-regular mb-2">
                      {facultyMember.first_name} {facultyMember.last_name}
                    </h1>
                    <div className="flex flex-col gap-1">
                      <h2 className="poppins-regular">
                        <span className="poppins-medium">Department:</span>{" "}
                        {facultyMember.department_name}
                      </h2>
                      <h2 className="poppins-regular">
                        <span className="poppins-medium">Program:</span>{" "}
                        {facultyMember.program_name}
                      </h2>
                    </div>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="mr-3 mt-1"
                      checked={selectedFaculty.includes(
                        facultyMember.faculty_id
                      )}
                      onChange={() =>
                        handleFacultyCheckboxChange(facultyMember.faculty_id)
                      }
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="basis-[55%]">
            <h1 className="text-xl poppins-regular">Subject List</h1>
            <div className="grid grid-cols-2 gap-6 mt-8">
              {subjects.map((subject) => (
                <label
                  key={subject.subject_code}
                  className={`shadow-md border transition-all duration-300 ease-in-out rounded-md p-4 flex justify-between ${
                    selectedSubjects.includes(subject.subject_code)
                      ? "shadow-lg shadow-blue-300"
                      : "hover:shadow-lg"
                  }`}
                >
                  <div>
                    <h1 className="text-lg poppins-regular mb-2">
                      {subject.subject_name}
                    </h1>
                    <div className="flex flex-col gap-1">
                      <h2 className="poppins-regular">
                        <span className="poppins-medium">Code:</span>{" "}
                        {subject.subject_code}
                      </h2>
                    </div>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="mr-3 mt-1"
                      checked={selectedSubjects.includes(subject.subject_code)}
                      onChange={() =>
                        handleSubjectCheckboxChange(subject.subject_code)
                      }
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {assignSubject && (
          <AssignSubjectsRegisterForm
            toggleAssignSubjectState={toggleAssignSubjectState}
          />
        )}
      </div>
    </div>
  );
};

export default AssignSubjects;
