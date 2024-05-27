import React, { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProgram,
  fetchPrograms,
} from "../../features/programs/programsSlice";
import ProgramRegistrationForm from "../../components/Programs/ProgramRegistrationForm";
import EditProgramForm from "../../components/Programs/EditProgramForm";

const Programs = () => {
  const dispatch = useDispatch();
  const programs = useSelector((state) => state.programs.programs);

  const [addProgram, setAddProgram] = useState(false);
  const [editProgram, setEditProgram] = useState(false);
  const [programToEdit, setProgramToEdit] = useState({});

  const deleteProgramHandler = async (programeName) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await dispatch(deleteProgram(programeName)).unwrap();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

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

  return (
    <div className="w-full  ml-[300px]  ">
      <div className="px-8 py-10 ">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <img src="/images/courses-black.png" alt="courses" />
            <h1 className="text-2xl poppins-medium uppercase ">
              Program Management
            </h1>
          </div>

          <button
            onClick={toggleAddProgramState}
            className="bg-[#164e8e] text-white h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3 hover:bg-[#133e6e] transition-colors duration-300"
          >
            Add Program
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>

        {programs.length > 0 ? (
          <div className="faculty-members-table__container my-10">
            <div className="mb-8 overflow-auto">
              <table className="min-w-full border shadow-sm   ">
                <thead>
                  <tr className="whitespace-nowrap shadow-sm border shadow-blue-200">
                    <th className="px-4 py-2 text-left font-bold">
                      PROGRAM ID
                    </th>
                    <th className="px-4 py-2 text-left font-bold">
                      PROGRAM NAME
                    </th>
                    <th className="px-4 py-2 text-left font-bold">
                      SCHOOL YEAR
                    </th>
                    <th className="px-4 py-2 text-left font-bold">
                      DEPARTMENT
                    </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((program, index) => (
                    <tr
                      key={index}
                      className="whitespace-nowrap border  hover:bg-gray-50  "
                    >
                      <td className="px-4 py-2 ">{program.program_id}</td>
                      <td className="px-4 py-2">{program.program_name}</td>
                      <td className="px-4 py-2">{program.school_year}</td>
                      <td className="px-4 py-2">{program.department_name}</td>
                      <td className="flex h-full items-center gap-2 px-4 py-2">
                        <button
                          onClick={() => toggleEditProgramState(program)}
                          className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200"
                        >
                          <FaRegEdit color="green" />
                        </button>
                        <button
                          className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200"
                          onClick={() =>
                            deleteProgramHandler(program.program_name)
                          }
                        >
                          <FaTrash color="red" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-full flex  bg-red-100 rounded-md items-center  border play-regular text-lg px-4 py-3 font-bold gap-2 text-red-800 mt-10">
            <MdErrorOutline color="red" />
            <h1>No Programs</h1>
          </div>
        )}

        {addProgram && (
          <ProgramRegistrationForm
            toggleAddProgramState={toggleAddProgramState}
            onProgramAdded={handleProgramAdded}
          />
        )}

        {editProgram && (
          <EditProgramForm
            program={programToEdit}
            toggleEditProgramState={toggleEditProgramState}
            onProgramAdded={handleProgramAdded}
          />
        )}
      </div>
    </div>
  );
};

export default Programs;
