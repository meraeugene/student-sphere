import React, { useState, useEffect } from "react";
import { GiTeacher } from "react-icons/gi";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFaculty,
  fetchFaculties,
  removeSubjects,
} from "../../features/faculties/facultiesSlice";
import FacultyRegistrationForm from "../../components/Faculty/FacultyRegistrationForm";
import EditFacultyForm from "../../components/Faculty/EditFacultyForm";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import DeleteModal from "../../components/DeleteModal";
import FacultyDetailsModal from "@/components/FacultyDetailsModal";

const Faculties = () => {
  const dispatch = useDispatch();
  const { faculties: facultyMembers } = useSelector((state) => state.faculties);
  const { departmentNames } = useSelector((state) => state.departments);
  const { programs } = useSelector((state) => state.programs);

  const [addFacultyMember, setAddFacultyMember] = useState(false);
  const [editFacultyMember, setEditFacultyMember] = useState(false);
  const [facultyMemberToEdit, setFacultyMemberToEdit] = useState({});
  const [filters, setFilters] = useState({
    department: "",
    program: "",
  });
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [facultySearchQuery, setFacultySearchQuery] = useState("");

  // State for delete confirmation modal
  const [facultyIdToDelete, setFacultyIdToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);
  const [showSectionDeleteConfirmation, setShowSectionDeleteConfirmation] =
    useState(false);

  // State for profile details modal
  const [showProfileDetailsModal, setShowProfileDetailsModal] = useState(false);
  const [facultyMemberDetails, setFacultyMemberDetails] = useState(null);

  const deleteFacultyMemberHandler = async (facultyId) => {
    try {
      await dispatch(deleteFaculty(facultyId)).unwrap();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to show delete confirmation modal
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

  const removeSectionHandler = async (facultyId) => {
    try {
      await dispatch(removeSubjects(facultyId)).unwrap();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFacultyAdded = () => {
    dispatch(fetchFaculties());
  };

  const toggleAddFacultyMemberState = () => {
    setAddFacultyMember(!addFacultyMember);
  };

  const toggleEditFacultyMemberState = (facultyMemberData) => {
    setFacultyMemberToEdit(facultyMemberData);
    setEditFacultyMember(!editFacultyMember);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    if (name === "department") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        program: "", // Clear the program filter when department changes
      }));

      const selectedDepartment = departmentNames.find(
        (department) => department.department_name === value
      );

      if (selectedDepartment) {
        const filtered = programs.filter(
          (program) =>
            program.department_id === selectedDepartment.department_id
        );
        setFilteredPrograms(filtered);
      } else {
        setFilteredPrograms([]);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchFaculties());
  }, []);

  const filteredFacultyMembers = facultyMembers.filter((facultyMember) => {
    return (
      (filters.department
        ? facultyMember.department_name === filters.department
        : true) &&
      (filters.program ? facultyMember.program_name === filters.program : true)
    );
  });

  const searchedFacultyMembers = filteredFacultyMembers.filter(
    (facultyMember) =>
      `${facultyMember.first_name} ${facultyMember.last_name}`
        .toLowerCase()
        .includes(facultySearchQuery.toLowerCase())
  );

  const showProfileDetailsModalHandler = (facultyMemberData) => {
    setFacultyMemberDetails(facultyMemberData);
    setShowProfileDetailsModal(true);
  };

  const closeProfileDetailsModal = () => {
    setShowProfileDetailsModal(false);
  };

  return (
    <div className="w-full ml-[320px] overflow-hidden">
      <div className="px-8 py-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <GiTeacher fontSize={24} />
            <h1 className="text-2xl poppins-medium uppercase">
              Faculties Management
            </h1>
          </div>

          <button
            onClick={toggleAddFacultyMemberState}
            className="bg-[#164e8e] text-white h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3 hover:bg-[#133e6e] transition-colors duration-300"
          >
            Add Faculty
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>

        <div className="flex justify-between mt-10">
          <div>
            <div className="search__container relative">
              <input
                type="search"
                placeholder="Search faculty name..."
                value={facultySearchQuery}
                onChange={(e) => setFacultySearchQuery(e.target.value)}
                className="border pl-9 pr-4 bg-[#F5F6F8] text-[#495D72] outline-none w-[250px] h-[40px] rounded-md font-medium"
              />
              <div className="absolute top-1/2 left-[10px] transform -translate-y-1/2">
                <img src="/images/search.png" alt="search" />
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center ">
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="border rounded-md p-2 shadow-sm hover:shadow-lg cursor-pointer outline-none transition-all duration-300 ease-in-out"
            >
              <option value="">All Departments</option>
              {departmentNames.map((department, index) => (
                <option key={index} value={department.department_name}>
                  {department.department_name}
                </option>
              ))}
            </select>
            <select
              name="program"
              value={filters.program}
              onChange={handleFilterChange}
              className="border rounded-md p-2 shadow-sm hover:shadow-lg cursor-pointer outline-none transition-all duration-300 ease-in-out"
            >
              <option value="">All Programs</option>
              {filteredPrograms.map((program, index) => (
                <option key={index} value={program.program_name}>
                  {program.program_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {searchedFacultyMembers.length > 0 ? (
          <div className="faculty-members-table__container my-10">
            <div className="mb-8 overflow-auto">
              <table className="min-w-full border shadow-sm">
                <thead>
                  <tr className="whitespace-nowrap shadow-sm border shadow-blue-200">
                    <th className="px-4 py-2 text-left font-bold">#</th>
                    <th className="px-4 py-2 text-left font-bold">USERNAME</th>
                    <th className="px-4 py-2 text-left font-bold">
                      FIRST NAME
                    </th>
                    <th className="px-4 py-2 text-left font-bold">LAST NAME</th>
                    <th className="px-4 py-2 text-left font-bold">EMAIL</th>
                    <th className="px-4 py-2 text-left font-bold">GENDER</th>
                    <th className="px-4 py-2 text-left font-bold">
                      DEPARTMENT
                    </th>
                    <th className="px-4 py-2 text-left font-bold">PROGRAM</th>
                    <th className="px-4 py-2 text-left font-bold">SECTIONS</th>
                    <th className="px-4 py-2 text-left font-bold">SUBJECTS</th>
                    <th className="px-4 py-2 text-left font-bold">
                      SCHOOL YEAR
                    </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {searchedFacultyMembers.map((facultyMember, index) => (
                    <tr
                      key={index + 1}
                      className="whitespace-nowrap border hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{facultyMember.username}</td>
                      <td className="px-4 py-2">
                        {facultyMember?.first_name &&
                          capitalizeFirstLetter(facultyMember.first_name)}
                      </td>
                      <td className="px-4 py-2">
                        {facultyMember?.last_name &&
                          capitalizeFirstLetter(facultyMember.last_name)}
                      </td>
                      <td className="px-4 py-2">{facultyMember.email}</td>
                      <td className="px-4 py-2">{facultyMember.gender}</td>
                      <td className="px-4 py-2">
                        {facultyMember.department_name}
                      </td>
                      <td className="px-4 py-2">
                        {facultyMember.program_name}
                      </td>

                      <td className="px-4 py-2">
                        {facultyMember.sections.length > 0 ? (
                          <span className="flex items-center gap-4">
                            {facultyMember.sections.map((section, index) => (
                              <span
                                key={index}
                                className="bg-green-200 h-[35px] flex items-center px-2 text-green-800 rounded-md "
                              >
                                {section.section_name}
                              </span>
                            ))}
                          </span>
                        ) : (
                          <span className="bg-orange-200 h-[35px] px-4 py-2 text-orange-500 rounded-md ">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-2 ">
                        {facultyMember.subjects.length > 0 ? (
                          <span className="flex items-center gap-4">
                            {facultyMember.subjects.map((subject, index) => (
                              <span
                                key={index}
                                className="bg-blue-200 h-[35px] flex items-center px-2 text-blue-800 rounded-md "
                              >
                                {subject.subject_code}
                              </span>
                            ))}
                          </span>
                        ) : (
                          <span className="bg-orange-200 h-[35px] px-4 py-2 text-orange-500 rounded-md ">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-2">
                        {facultyMember.school_year ? (
                          <span className="bg-green-200 h-[35px] px-2 text-green-700 rounded-md flex items-center justify-center">
                            {facultyMember.school_year}
                          </span>
                        ) : (
                          <span className="bg-orange-200 h-[35px] px-2 text-orange-500 rounded-md flex items-center justify-center">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="flex h-full items-center gap-2 px-4 py-2">
                        <button
                          onClick={() =>
                            showProfileDetailsModalHandler(facultyMember)
                          }
                          className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200 text-sm"
                        >
                          Details
                        </button>
                        <button
                          onClick={() =>
                            toggleEditFacultyMemberState(facultyMember)
                          }
                          className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200"
                        >
                          <FaRegEdit color="green" />
                        </button>
                        <button
                          className={`btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200 ${
                            facultyMember?.sections?.length > 0
                              ? "cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() =>
                            showDeleteConfirmationModal(
                              facultyMember.faculty_id,
                              true
                            )
                          }
                          disabled={facultyMember?.sections?.length > 0}
                        >
                          <FaTrash color="red" />
                        </button>

                        {facultyMember?.sections?.length > 0 && (
                          <button
                            className="btn-sm text-sm bg-[#af2833] border-none text-white poppins-regular rounded h-[35px] px-2 outline-none hover:opacity-90"
                            onClick={() =>
                              showDeleteConfirmationModal(
                                facultyMember.faculty_id,
                                false
                              )
                            }
                          >
                            REMOVE SUBJECTS
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-lg text-gray-500 rounded-md poppins-regular mt-8  py-2 px-4 border">
            No faculty member found. Please try again.
          </div>
        )}

        {showProfileDetailsModal && facultyMemberDetails && (
          <FacultyDetailsModal
            data={facultyMemberDetails}
            close={closeProfileDetailsModal}
          />
        )}

        {showDeleteConfirmation && facultyIdToDelete && (
          <DeleteModal
            onCancel={hideDeleteConfirmationModal}
            onDelete={() => {
              deleteFacultyMemberHandler(facultyIdToDelete);
              hideDeleteConfirmationModal();
            }}
          />
        )}

        {showSectionDeleteConfirmation && sectionIdToDelete && (
          <DeleteModal
            onCancel={() => setShowSectionDeleteConfirmation(false)}
            onDelete={() => {
              removeSectionHandler(sectionIdToDelete);
              setShowSectionDeleteConfirmation(false);
            }}
          />
        )}

        {addFacultyMember && (
          <FacultyRegistrationForm
            toggleAddFacultyMemberState={toggleAddFacultyMemberState}
            onFacultyAdded={handleFacultyAdded}
          />
        )}

        {editFacultyMember && (
          <EditFacultyForm
            facultyMember={facultyMemberToEdit}
            toggleEditFacultyMemberState={toggleEditFacultyMemberState}
            onFacultyMemberAdded={handleFacultyAdded}
          />
        )}
      </div>
    </div>
  );
};

export default Faculties;
