import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaculties } from "../features/faculties/facultiesSlice";

const useFacultyData = () => {
  const [filters, setFilters] = useState({ department: "", program: "" });
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [facultySearchQuery, setFacultySearchQuery] = useState("");
  const dispatch = useDispatch();
  const { faculties: facultyMembers } = useSelector((state) => state.faculties);
  const { departmentNames } = useSelector((state) => state.departments);
  const { programs } = useSelector((state) => state.programs);

  useEffect(() => {
    dispatch(fetchFaculties());
  }, [dispatch]);

  const handleFacultyAdded = () => {
    dispatch(fetchFaculties());
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
        program: "",
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

  return {
    filteredFacultyMembers: searchedFacultyMembers,
    filters,
    filteredPrograms,
    facultySearchQuery,
    setFacultySearchQuery,
    handleFilterChange,
    departmentNames,
    handleFacultyAdded,
  };
};

export default useFacultyData;
