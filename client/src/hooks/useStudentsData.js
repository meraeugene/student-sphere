import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/students/studentsSlice";

const useStudentsData = () => {
  const [filters, setFilters] = useState({ department: "", program: "" });
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const dispatch = useDispatch();
  const studentsData = useSelector((state) => state.students.students);
  const { departmentNames } = useSelector((state) => state.departments);
  const { programs } = useSelector((state) => state.programs);

  useEffect(() => {
    dispatch(fetchStudents());
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

  const filteredStudents = studentsData.filter((student) => {
    return (
      (filters.department
        ? student.department_name === filters.department
        : true) &&
      (filters.program ? student.program_name === filters.program : true)
    );
  });

  const searchedStudents = filteredStudents.filter((student) =>
    `${student.first_name} ${student.last_name}`
      .toLowerCase()
      .includes(studentSearchQuery.toLowerCase())
  );

  return {
    students: searchedStudents,
    filters,
    filteredPrograms,
    studentSearchQuery,
    setStudentSearchQuery,
    handleFilterChange,
    departmentNames,
  };
};

export default useStudentsData;
