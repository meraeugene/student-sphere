import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects } from "../features/subjects/subjectsSlice";

const useSubjectData = () => {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects.subjects);
  const [yearLevelFilter, setYearLevelFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [subjectSearchQuery, setSubjectSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const filteredSubjects = subjects.filter((subject) => {
    return (
      (yearLevelFilter === "" ||
        (subject.year_level &&
          subject.year_level.toString() === yearLevelFilter)) &&
      (semesterFilter === "" ||
        (subject.semester && subject.semester.toString() === semesterFilter)) &&
      (programFilter === "" || subject.program_name === programFilter)
    );
  });

  const searchedSubjects = filteredSubjects.filter((subject) =>
    subject.subject_name
      .toLowerCase()
      .includes(subjectSearchQuery.toLowerCase())
  );

  return {
    searchedSubjects,
    setYearLevelFilter,
    setSemesterFilter,
    setProgramFilter,
    setSubjectSearchQuery,
    subjectSearchQuery,
    yearLevelFilter,
    semesterFilter,
    programFilter,
    subjects,
  };
};

export default useSubjectData;
