import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrograms } from "../features/programs/programsSlice";

const useProgramsData = () => {
  const dispatch = useDispatch();
  const programs = useSelector((state) => state.programs.programs);
  const { departmentNames } = useSelector((state) => state.departments);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [programSearchQuery, setProgramSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const filteredPrograms = selectedDepartment
    ? programs.filter(
        (program) => program.department_name === selectedDepartment
      )
    : programs;

  const searchedPrograms = filteredPrograms.filter((program) =>
    program.program_name
      .toLowerCase()
      .includes(programSearchQuery.toLowerCase())
  );

  return {
    departmentNames,
    handleDepartmentChange,
    filteredPrograms,
    searchedPrograms,
    programSearchQuery,
    setProgramSearchQuery,
  };
};

export default useProgramsData;
