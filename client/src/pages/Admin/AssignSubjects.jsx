import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AssignSubjectsRegisterForm from "../../components/Admin/AssignSubjects/AssignSubjectsRegisterForm";
import { toast } from "react-toastify";
import { fetchFaculties } from "../../features/faculties/facultiesSlice";

const AssignSubjects = () => {
  const facultyMembers = useSelector((state) => state.faculties.faculties);
  const subjects = useSelector((state) => state.subjects.subjects);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [assignSubject, setAssignSubject] = useState(false);
  const [facultySearchQuery, setFacultySearchQuery] = useState("");
  const [subjectSearchQuery, setSubjectSearchQuery] = useState("");

  const handleFacultyCheckboxChange = (facultyId) => {
    setSelectedFaculty((prevSelected) =>
      prevSelected === facultyId ? null : facultyId
    );
  };

  const handleSubjectCheckboxChange = (subjectCode) => {
    setSelectedSubject((prevSelected) =>
      prevSelected === subjectCode ? null : subjectCode
    );
  };

  const getFilteredSubjects = () => {
    if (!selectedFaculty) return subjects;
    const selectedFacultyMember = facultyMembers.find(
      (faculty) => faculty.faculty_id === selectedFaculty
    );
    const selectedPrograms = selectedFacultyMember
      ? [selectedFacultyMember.program_name]
      : [];
    return subjects.filter((subject) =>
      selectedPrograms.includes(subject.program_name)
    );
  };

  const filteredSubjects = getFilteredSubjects();

  // Filter faculty members based on the search query
  const filteredFacultyMembers = facultyMembers.filter((facultyMember) =>
    `${facultyMember.first_name} ${facultyMember.last_name}`
      .toLowerCase()
      .includes(facultySearchQuery.toLowerCase())
  );

  // Filter subjects based on the search query
  const searchedSubjects = filteredSubjects.filter((subject) =>
    subject.subject_name
      .toLowerCase()
      .includes(subjectSearchQuery.toLowerCase())
  );

  // Function to handle assigning subject
  const handleAssignSubject = () => {
    if (!selectedFaculty || !selectedSubject) {
      toast.error("Please select both a faculty and a subject first.");
      return;
    }
    setAssignSubject(!assignSubject);
  };

  const dispatch = useDispatch();

  const handleFacultySubjectsAdded = () => {
    dispatch(fetchFaculties());
  };

  return (
    <div className="w-full ml-[320px] ">
      <div className="px-8 py-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3">
              <img src="/images/subjects-black.svg" alt="subjects" />
              <h1 className="text-2xl poppins-medium uppercase">
                Assign Subjects to Faculty Members
              </h1>
            </div>
            <p className="poppins-regular mt-2 text-gray-700">
              Assign a faculty member to a subject with a section, day and time
              slot.
            </p>
          </div>

          <button
            onClick={handleAssignSubject}
            className="bg-[#164e8e] text-white h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3 hover:bg-[#133e6e] transition-colors duration-300"
          >
            Assign Subject
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>

        <div className="flex gap-10 mt-10">
          <div className="basis-[45%]">
            <div className="flex justify-between items-center">
              <h1 className="text-xl poppins-regular">Faculty Members List</h1>
              <div className="search__container relative">
                <input
                  type="search"
                  placeholder="Search"
                  value={facultySearchQuery}
                  onChange={(e) => setFacultySearchQuery(e.target.value)}
                  className="border pl-9 pr-4 bg-[#F5F6F8] text-[#495D72] outline-none w-[250px] h-[34px] rounded-md font-medium"
                />
                <div className="absolute top-1/2 left-[10px] transform -translate-y-1/2">
                  <img src="/images/search.png" alt="search" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 max-h-[570px] overflow-y-auto">
              {filteredFacultyMembers.length > 0 ? (
                filteredFacultyMembers.map((facultyMember) => (
                  <label
                    key={facultyMember.faculty_id}
                    className={`shadow-md border transition-all duration-300 ease-in-out rounded-md p-4 flex justify-between cursor-pointer ${
                      selectedFaculty === facultyMember.faculty_id
                        ? "shadow-lg border-blue-300 shadow-blue-300"
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
                        checked={selectedFaculty === facultyMember.faculty_id}
                        onChange={() =>
                          handleFacultyCheckboxChange(facultyMember.faculty_id)
                        }
                      />
                    </div>
                  </label>
                ))
              ) : (
                <div className="text-lg text-gray-500 rounded-md poppins-regular py-2 px-4 border">
                  No faculty found. Please try again.
                </div>
              )}
            </div>
          </div>

          <div className="basis-[55%]">
            <div className="flex justify-between items-center">
              <h1 className="text-xl poppins-regular">Subject List</h1>
              <div className="search__container relative">
                <input
                  type="search"
                  placeholder="Search"
                  value={subjectSearchQuery}
                  onChange={(e) => setSubjectSearchQuery(e.target.value)}
                  className="border pl-9 pr-4 bg-[#F5F6F8] text-[#495D72] outline-none w-[250px] h-[34px] rounded-md font-medium"
                />
                <div className="absolute top-1/2 left-[10px] transform -translate-y-1/2">
                  <img src="/images/search.png" alt="search" />
                </div>
              </div>
            </div>
            {searchedSubjects.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 mt-8 max-h-[580px] overflow-y-auto">
                {searchedSubjects.map((subject) => (
                  <label
                    key={subject.subject_code}
                    className={`shadow-md cursor-pointer  border transition-all duration-300 ease-in-out rounded-md p-4 flex justify-between ${
                      selectedSubject === subject.subject_code
                        ? "shadow-lg border-blue-300 shadow-blue-300"
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
                        <h2 className="poppins-regular">
                          <span className="poppins-medium">Program:</span>{" "}
                          {subject.program_name}
                        </h2>
                      </div>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        className="mr-3 mt-1"
                        checked={selectedSubject === subject.subject_code}
                        onChange={() =>
                          handleSubjectCheckboxChange(subject.subject_code)
                        }
                      />
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-lg text-gray-500 rounded-md poppins-regular mt-8  py-2 px-4 border">
                No subjects found. Please try again.
              </div>
            )}
          </div>
        </div>

        {assignSubject && (
          <AssignSubjectsRegisterForm
            toggleAssignSubjectState={handleAssignSubject}
            selectedFaculty={selectedFaculty}
            selectedSubject={selectedSubject}
            assignedFacultySubjectsAdded={handleFacultySubjectsAdded}
          />
        )}
      </div>
    </div>
  );
};

export default AssignSubjects;
