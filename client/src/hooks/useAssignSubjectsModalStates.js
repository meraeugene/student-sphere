import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaculties } from "../features/faculties/facultiesSlice";
import { toast } from "react-toastify";

const useAssignSubjectsModalStates = () => {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects.subjects);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [assignSubject, setAssignSubject] = useState(false);

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

  const handleAssignSubject = () => {
    if (!selectedFaculty || !selectedSubject) {
      toast.error("Please select both a faculty and a subject first.");
      return;
    }
    setAssignSubject(!assignSubject);
  };

  const handleFacultySubjectsAdded = () => {
    dispatch(fetchFaculties());
  };

  return {
    subjects,
    selectedFaculty,
    selectedSubject,
    assignSubject,
    setSelectedFaculty,
    setSelectedSubject,
    setAssignSubject,
    handleFacultyCheckboxChange,
    handleSubjectCheckboxChange,
    handleAssignSubject,
    handleFacultySubjectsAdded,
  };
};

export default useAssignSubjectsModalStates;
