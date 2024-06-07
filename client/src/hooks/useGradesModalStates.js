import { useState } from "react";

const useGradesModalStates = () => {
  const [addStudentGrade, setAddStudentGrade] = useState(false);
  const [studentToAddGrade, setStudentToAddGrade] = useState({});
  const [editStudentGrade, setEditStudentGrade] = useState(false);
  const [studentToEditGrade, setStudentToEditGrade] = useState({});
  const [showProfileDetailsModal, setShowProfileDetailsModal] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);

  const toggleAddStudentGradeState = (studentData) => {
    setStudentToAddGrade(studentData);
    setAddStudentGrade(!addStudentGrade);
  };

  const toggleEditStudentGradeState = (studentData) => {
    setStudentToEditGrade(studentData);
    setEditStudentGrade(!editStudentGrade);
  };

  const showProfileDetailsModalHandler = (studentData) => {
    setStudentDetails(studentData);
    setShowProfileDetailsModal(true);
  };

  const closeProfileDetailsModal = () => {
    setShowProfileDetailsModal(false);
  };

  return {
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
  };
};

export default useGradesModalStates;
