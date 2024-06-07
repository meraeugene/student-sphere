import { useState } from "react";
import { useSelector } from "react-redux";

const useAssignSubjectsData = () => {
  const facultyMembers = useSelector((state) => state.faculties.faculties);
  const subjects = useSelector((state) => state.subjects.subjects);
  const [facultySearchQuery, setFacultySearchQuery] = useState("");
  const [subjectSearchQuery, setSubjectSearchQuery] = useState("");

  const getFilteredSubjects = (selectedFaculty) => {
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

  const filteredFacultyMembers = facultyMembers.filter((facultyMember) =>
    `${facultyMember.first_name} ${facultyMember.last_name}`
      .toLowerCase()
      .includes(facultySearchQuery.toLowerCase())
  );

  const filteredSubjects = getFilteredSubjects();

  const searchedSubjects = filteredSubjects.filter((subject) =>
    subject.subject_name
      .toLowerCase()
      .includes(subjectSearchQuery.toLowerCase())
  );

  return {
    filteredFacultyMembers,
    setFacultySearchQuery,
    facultySearchQuery,
    searchedSubjects,
    setSubjectSearchQuery,
  };
};

export default useAssignSubjectsData;
