import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSections } from "../features/sections/sectionsSlice";

const useSectionData = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.sections.sections);
  const departmentNames = useSelector(
    (state) => state.departments.departmentNames
  );
  const programs = useSelector((state) => state.programs.programs);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [sectionSearchQuery, setSectionSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    yearLevel: "",
    department: "",
    program: "",
  });

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

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

  const searchedSections = filteredSections.filter((section) =>
    section.section_name
      .toLowerCase()
      .includes(sectionSearchQuery.toLowerCase())
  );

  return {
    departmentNames,
    searchedSections,
    setSectionSearchQuery,
    sectionSearchQuery,
    handleFilterChange,
    filters,
    filteredPrograms,
  };
};

export default useSectionData;
