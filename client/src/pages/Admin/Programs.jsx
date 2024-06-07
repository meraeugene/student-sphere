import { FaTrash, FaRegEdit } from "react-icons/fa";
import ProgramRegistrationForm from "../../components/Admin/Programs/ProgramRegistrationForm";
import EditProgramForm from "../../components/Admin/Programs/EditProgramForm";
import DeleteModal from "../../components/DeleteModal";
import useProgramsData from "../../hooks/useProgramsData";
import useProgramsModalStates from "../../hooks/useProgramsModalStates";

const Programs = () => {
  const {
    searchedPrograms,
    departmentNames,
    programSearchQuery,
    setProgramSearchQuery,
    handleDepartmentChange,
  } = useProgramsData();

  const {
    addProgram,
    editProgram,
    programToEdit,
    selectedDepartment,
    programToDelete,
    showDeleteConfirmation,
    toggleAddProgramState,
    toggleEditProgramState,
    handleProgramAdded,
    deleteProgramHandler,
    showDeleteConfirmationModal,
    hideDeleteConfirmationModal,
  } = useProgramsModalStates();

  return (
    <div className="w-full ml-[320px]">
      <div className="px-8 py-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/courses-black.png" alt="courses" />
            <h1 className="text-2xl poppins-medium uppercase">
              Program Management
            </h1>
          </div>

          <button
            onClick={toggleAddProgramState}
            className="bg-[#164e8e] text-white h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3 hover:bg-[#133e6e
              transition-colors duration-300"
          >
            Add Program
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>
        <div className="flex justify-between items-center mt-10">
          <div>
            <div className="search__container relative ">
              <input
                type="search"
                placeholder="Search program name..."
                value={programSearchQuery}
                onChange={(e) => setProgramSearchQuery(e.target.value)}
                className="border pl-9 pr-4 bg-[#F5F6F8] text-[#495D72] outline-none h-[40px] rounded-md font-medium"
              />
              <div className="absolute top-1/2 left-[10px] transform -translate-y-1/2">
                <img src="/images/search.png" alt="search" />
              </div>
            </div>
          </div>
          <select
            id="department-filter"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="border rounded-md p-2"
          >
            <option value="">All Departments</option>
            {departmentNames.map((department, index) => (
              <option key={index} value={department.department_name}>
                {department.department_name}
              </option>
            ))}
          </select>
        </div>
        {searchedPrograms.length > 0 ? (
          <div className="faculty-members-table__container my-10">
            <div className="mb-8 overflow-auto">
              <table className="min-w-full border shadow-sm">
                <thead>
                  <tr className="whitespace-nowrap shadow-sm border shadow-blue-200">
                    <th className="px-4 py-2 text-left font-bold">#</th>
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
                  {searchedPrograms.map((program, index) => (
                    <tr
                      key={index}
                      className="whitespace-nowrap border hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
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
                            showDeleteConfirmationModal(program.program_name)
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
          <div className="text-lg text-gray-500 rounded-md poppins-regular mt-8  py-2 px-4 border">
            No programs found. Please try again.
          </div>
        )}
        {showDeleteConfirmation && programToDelete && (
          <DeleteModal
            onCancel={hideDeleteConfirmationModal}
            onDelete={() => {
              deleteProgramHandler(programToDelete);
              hideDeleteConfirmationModal();
            }}
          />
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
