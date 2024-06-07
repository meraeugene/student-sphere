import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteStudent } from "../features/students/studentsSlice";

const useStudentModalStates = () => {
  const [addStudent, setAddStudent] = useState(false);
  const [editStudent, setEditStudent] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState({});
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showProfileDetailsModal, setShowProfileDetailsModal] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);

  const dispatch = useDispatch();

  const toggleAddStudentState = () => {
    setAddStudent(!addStudent);
  };

  const toggleEditStudentState = (studentData) => {
    setStudentToEdit(studentData);
    setEditStudent(!editStudent);
  };

  const showDeleteConfirmationModal = (id) => {
    setStudentIdToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const hideDeleteConfirmationModal = () => {
    setShowDeleteConfirmation(false);
  };

  const showProfileDetailsModalHandler = (studentData) => {
    setStudentDetails(studentData);
    setShowProfileDetailsModal(true);
  };

  const closeProfileDetailsModal = () => {
    setShowProfileDetailsModal(false);
  };

  const deleteStudentHandler = async (studentId) => {
    try {
      await dispatch(deleteStudent(studentId)).unwrap();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    addStudent,
    editStudent,
    studentToEdit,
    studentIdToDelete,
    showDeleteConfirmation,
    showProfileDetailsModal,
    studentDetails,
    toggleAddStudentState,
    toggleEditStudentState,
    showDeleteConfirmationModal,
    hideDeleteConfirmationModal,
    showProfileDetailsModalHandler,
    closeProfileDetailsModal,
    deleteStudentHandler,
  };
};

export default useStudentModalStates;
