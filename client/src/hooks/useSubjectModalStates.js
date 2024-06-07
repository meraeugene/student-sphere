import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteSubject,
  fetchSubjects,
} from "../features/subjects/subjectsSlice";

const useSubjectModalStates = () => {
  const dispatch = useDispatch();
  const [addSubject, setAddSubject] = useState(false);
  const [editSubject, setEditSubject] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState({});
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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

  const deleteSubjectHandler = async (subjectCode) => {
    try {
      await dispatch(deleteSubject(subjectCode)).unwrap();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showDeleteConfirmationModal = (subjectCode) => {
    setSubjectToDelete(subjectCode);
    setShowDeleteConfirmation(true);
  };

  const hideDeleteConfirmationModal = () => {
    setShowDeleteConfirmation(false);
  };

  return {
    addSubject,
    editSubject,
    subjectToEdit,
    subjectToDelete,
    showDeleteConfirmation,
    toggleAddSubjectState,
    toggleEditSubjectState,
    handleSubjectAdded,
    deleteSubjectHandler,
    showDeleteConfirmationModal,
    hideDeleteConfirmationModal,
  };
};

export default useSubjectModalStates;
