import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteProgram,
  fetchPrograms,
} from "../features/programs/programsSlice";

const useProgramsModalStates = () => {
  const dispatch = useDispatch();
  const [addProgram, setAddProgram] = useState(false);
  const [editProgram, setEditProgram] = useState(false);
  const [programToEdit, setProgramToEdit] = useState({});
  const [programToDelete, setProgramToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const toggleAddProgramState = () => {
    setAddProgram(!addProgram);
  };

  const toggleEditProgramState = (program) => {
    setProgramToEdit(program);
    setEditProgram(!editProgram);
  };

  const handleProgramAdded = () => {
    dispatch(fetchPrograms());
  };

  const deleteProgramHandler = async (programName) => {
    try {
      await dispatch(deleteProgram(programName)).unwrap();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showDeleteConfirmationModal = (programName) => {
    setProgramToDelete(programName);
    setShowDeleteConfirmation(true);
  };

  const hideDeleteConfirmationModal = () => {
    setShowDeleteConfirmation(false);
  };

  return {
    addProgram,
    editProgram,
    programToEdit,
    programToDelete,
    showDeleteConfirmation,
    toggleAddProgramState,
    toggleEditProgramState,
    handleProgramAdded,
    deleteProgramHandler,
    showDeleteConfirmationModal,
    hideDeleteConfirmationModal,
  };
};

export default useProgramsModalStates;
