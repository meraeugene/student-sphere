import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrades } from "../features/grades/gradesSlice";

const useGradesData = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { grades: students } = useSelector((state) => state.grades);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGrades({ facultyId: userInfo.faculty_id }));
  }, [dispatch, userInfo.faculty_id]);

  const handleStudentGradesAdded = () => {
    dispatch(fetchGrades({ facultyId: userInfo.faculty_id }));
  };

  return { userInfo, students, handleStudentGradesAdded };
};

export default useGradesData;
