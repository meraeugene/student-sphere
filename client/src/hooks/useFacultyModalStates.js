import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteFaculty,
  removeSubjects,
} from "../features/faculties/facultiesSlice";

const useFacultyModalStates = () => {
  const [addFacultyMember, setAddFacultyMember] = useState(false);
  const [editFacultyMember, setEditFacultyMember] = useState(false);
  const [facultyMemberToEdit, setFacultyMemberToEdit] = useState({});
  const [facultyIdToDelete, setFacultyIdToDelete] = useState(null);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showProfileDetailsModal, setShowProfileDetailsModal] = useState(false);
  const [facultyMemberDetails, setFacultyMemberDetails] = useState(null);
  const [showSectionDeleteConfirmation, setShowSectionDeleteConfirmation] =
    useState(false);

  const dispatch = useDispatch();

  const toggleAddFacultyMemberState = () => {
    setAddFacultyMember(!addFacultyMember);
  };

  const toggleEditFacultyMemberState = (facultyMemberData) => {
    setFacultyMemberToEdit(facultyMemberData);
    setEditFacultyMember(!editFacultyMember);
  };

  const showDeleteConfirmationModal = (id, isFaculty) => {
    if (isFaculty) {
      setFacultyIdToDelete(id);
      setShowDeleteConfirmation(true);
    } else {
      setSectionIdToDelete(id);
      setShowSectionDeleteConfirmation(true);
    }
  };

  const hideDeleteConfirmationModal = () => {
    setShowDeleteConfirmation(false);
  };

  const deleteFacultyMemberHandler = async (facultyId) => {
    try {
      await dispatch(deleteFaculty(facultyId)).unwrap();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeSectionHandler = async (facultyId) => {
    try {
      await dispatch(removeSubjects(facultyId)).unwrap();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showProfileDetailsModalHandler = (facultyMemberData) => {
    setFacultyMemberDetails(facultyMemberData);
    setShowProfileDetailsModal(true);
  };

  const closeProfileDetailsModal = () => {
    setShowProfileDetailsModal(false);
  };

  return {
    addFacultyMember,
    editFacultyMember,
    facultyMemberToEdit,
    facultyIdToDelete,
    showDeleteConfirmation,
    showProfileDetailsModal,
    facultyMemberDetails,
    toggleAddFacultyMemberState,
    toggleEditFacultyMemberState,
    showDeleteConfirmationModal,
    hideDeleteConfirmationModal,
    showProfileDetailsModalHandler,
    closeProfileDetailsModal,
    deleteFacultyMemberHandler,
    removeSectionHandler,
    showSectionDeleteConfirmation,
    sectionIdToDelete,
    setShowSectionDeleteConfirmation,
  };
};

export default useFacultyModalStates;
