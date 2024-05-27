import React, { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSection,
  fetchSections,
} from "../../features/sections/sectionsSlice";
import SectionRegistrationForm from "../../components/Sections/SectionRegistrationForm";
import EditSectionForm from "../../components/Sections/EditSectionForm.jsx";

const Sections = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.sections.sections);
  const { departmentNames } = useSelector((state) => state.departments);
  const { programs } = useSelector((state) => state.programs);

  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [sectionToEdit, setSectionToEdit] = useState({});
  const [filters, setFilters] = useState({
    yearLevel: "",
    department: "",
    program: "",
  });
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  const deleteSectionHandler = async (sectionId) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      try {
        await dispatch(deleteSection(sectionId)).unwrap();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

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

  const filteredSections = sections.filter((section) => {
    return (
      (filters.yearLevel ? section.year_level === filters.yearLevel : true) &&
      (filters.department
        ? section.department_name === filters.department
        : true) &&
      (filters.program ? section.program_name === filters.program : true)
    );
  });

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  return (
    <div className="w-full  ml-[300px]  ">
      <div className="px-8 py-10 ">
        <div className="flex items-center justify-between ">
          <div>
            <div className="flex items-center gap-3">
              <img src="/images/section-black.svg" alt="courses" />
              <h1 className="text-2xl poppins-medium uppercase ">
                Section Management
              </h1>
            </div>
            <p className="poppins-regular mt-2 text-gray-700">
              Select a department first before using the the program filter.
            </p>
          </div>

          <button
            onClick={toggleAddSectionState}
            className="bg-[#164e8e] text-white h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3 hover:bg-[#133e6e] transition-colors duration-300"
          >
            Add Section
            <img src="/images/add.svg" alt="add user" />
          </button>
        </div>

        <div className="flex justify-between mt-10">
          <div></div>
          <div className="flex gap-4 items-center ">
            <select
              name="yearLevel"
              value={filters.yearLevel}
              onChange={handleFilterChange}
              className="border rounded-md p-2  shadow-sm hover:shadow-lg cursor-pointer outline-none transition-all duration-300 ease-in-out"
            >
              <option value="">All Year Levels</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="border rounded-md p-2  shadow-sm hover:shadow-lg cursor-pointer outline-none transition-all duration-300 ease-in-out"
            >
              <option value="">All Departments</option>
              {departmentNames.map((department, index) => (
                <option key={index}>{department.department_name}</option>
              ))}
            </select>
            <select
              name="program"
              value={filters.program}
              onChange={handleFilterChange}
              className="border rounded-md p-2  shadow-sm hover:shadow-lg cursor-pointer outline-none transition-all duration-300 ease-in-out"
            >
              <option value="" hidden>
                Select a program
              </option>
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program, index) => (
                  <option key={index}>{program.program_name}</option>
                ))
              ) : (
                <option value="" disabled>
                  No Program Available (Select a department first)
                </option>
              )}
            </select>
          </div>
        </div>

        {filteredSections.length > 0 ? (
          <div className="mt-8">
            <div className="mb-8 overflow-auto">
              <table className="min-w-full border shadow-sm   ">
                <thead>
                  <tr className="whitespace-nowrap shadow-sm border shadow-blue-200">
                    <th className="px-4 py-2 text-left font-bold">
                      SECTION ID
                    </th>
                    <th className="px-4 py-2 text-left font-bold">
                      SECTION NAME
                    </th>
                    <th className="px-4 py-2 text-left font-bold">
                      YEAR LEVEL
                    </th>
                    <th className="px-4 py-2 text-left font-bold">
                      DEPARTMENT
                    </th>
                    <th className="px-4 py-2 text-left font-bold">PROGRAM</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSections.map((section, index) => (
                    <tr
                      key={index}
                      className="whitespace-nowrap border  hover:bg-gray-50  "
                    >
                      <td className="px-4 py-2 ">{section.section_id}</td>
                      <td className="px-4 py-2">{section.section_name}</td>
                      <td className="px-4 py-2">{section.year_level}</td>
                      <td className="px-4 py-2">{section.department_name}</td>
                      <td className="px-4 py-2">{section.program_name}</td>
                      <td className="flex h-full items-center gap-2 px-4 py-2">
                        <button
                          onClick={() => toggleEditSectionState(section)}
                          className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200"
                        >
                          <FaRegEdit color="green" />
                        </button>
                        <button
                          className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200"
                          onClick={() =>
                            deleteSectionHandler(section.section_id)
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
            <h1>No Sections</h1>
          </div>
        )}
        {addSection && (
          <SectionRegistrationForm
            toggleAddSectionState={toggleAddSectionState}
            onSectionAdded={handleSectionAdded}
          />
        )}
        {editSection && (
          <EditSectionForm
            section={sectionToEdit}
            toggleEditSectionState={toggleEditSectionState}
            onSectionAdded={handleSectionAdded}
          />
        )}
      </div>
    </div>
  );
};

export default Sections;
