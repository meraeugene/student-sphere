import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteSection,
  fetchSections,
} from "../features/sections/sectionsSlice";

const useSectionModalStates = () => {
  const dispatch = useDispatch();
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [sectionToEdit, setSectionToEdit] = useState({});
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const toggleAddSectionState = () => {
    setAddSection(!addSection);
  };

  const toggleEditSectionState = (section) => {
    setSectionToEdit(section);
    setEditSection(!editSection);
  };

  const handleSectionAdded = () => {
    dispatch(fetchSections());
  };

  const deleteSectionHandler = async (sectionId) => {
    try {
      await dispatch(deleteSection(sectionId)).unwrap();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showDeleteConfirmationModal = (sectionId) => {
    setSectionToDelete(sectionId);
    setShowDeleteConfirmation(true);
  };

  const hideDeleteConfirmationModal = () => {
    setShowDeleteConfirmation(false);
  };

  return {
    addSection,
    editSection,
    sectionToEdit,
    sectionToDelete,
    showDeleteConfirmation,
    toggleAddSectionState,
    toggleEditSectionState,
    handleSectionAdded,
    deleteSectionHandler,
    showDeleteConfirmationModal,
    hideDeleteConfirmationModal,
  };
};

export default useSectionModalStates;
