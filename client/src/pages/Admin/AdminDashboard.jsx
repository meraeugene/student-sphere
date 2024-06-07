import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import {
  fetchDepartmentNames,
  fetchDepartments,
} from "../../features/departments/departmentsSlice";
import {
  fetchProgramNames,
  fetchPrograms,
} from "../../features/programs/programsSlice";
import { fetchSubjects } from "../../features/subjects/subjectsSlice";
import { fetchFaculties } from "../../features/faculties/facultiesSlice";
import { fetchSections } from "../../features/sections/sectionsSlice";
import { fetchStudents } from "../../features/students/studentsSlice";
import axios from "axios";
import StatisticCard from "../../components/StatisticCard";
import { GiTeacher } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { departments } = useSelector((state) => state.departments);
  const { programs } = useSelector((state) => state.programs);
  const { subjects } = useSelector((state) => state.subjects);
  const { sections } = useSelector((state) => state.sections);
  const { faculties } = useSelector((state) => state.faculties);
  const { students } = useSelector((state) => state.students);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost/student-sphere/server/Users/get_user_profile.php?user_id=${userInfo.user_id}`
        );
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [userInfo.user_id]);

  const firstName = profile ? capitalizeFirstLetter(profile.first_name) : "";
  const lastName = profile ? capitalizeFirstLetter(profile.last_name) : "";

  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "long",
  });

  useEffect(() => {
    dispatch(fetchDepartmentNames());
    dispatch(fetchProgramNames());
    dispatch(fetchDepartments());
    dispatch(fetchPrograms());
    dispatch(fetchSubjects());
    dispatch(fetchFaculties());
    dispatch(fetchSections());
    dispatch(fetchStudents());
  }, [dispatch]);

  // Memoize the selected data to prevent unnecessary re-renders
  const selectedData = useMemo(
    () => ({
      departments,
      programs,
      subjects,
      sections,
      faculties,
      students,
    }),
    [departments, programs, subjects, sections, faculties, students]
  );

  return (
    <main className="w-full flex ml-[320px] h-screen bg-gray-50">
      <div className=" py-6 px-8 w-full">
        <div className="welcome__container">
          <div className="flex items-center justify-between">
            {loading ? (
              <l-dot-pulse size="43" speed="1.3" color="black"></l-dot-pulse>
            ) : (
              <div className="flex items-center gap-3">
                <img src="/images/hello.png" alt="hello" />
                <h1 className="text-2xl poppins-regular">
                  Welcome, {firstName} {lastName}!
                </h1>
              </div>
            )}
            <h1 className="poppins-regular text-[#495D72] text-sm">
              {currentDate}
            </h1>
          </div>
        </div>

        <div className="flex mt-8 gap-10 min-h-[350px]">
          <div className="grid grid-cols-3 grid-rows-2 gap-6 basis-[85%] poppins-regular">
            <StatisticCard
              icon="/images/admin-dashboard/department.svg"
              title="Total Departments"
              count={selectedData.departments.length}
            />
            <StatisticCard
              icon="/images/admin-dashboard/program.svg"
              title="Total Programs"
              count={selectedData.programs.length}
            />
            <StatisticCard
              icon="/images/admin-dashboard/section.svg"
              title="Total Sections"
              count={selectedData.sections.length}
            />
            <StatisticCard
              icon="/images/admin-dashboard/subject.svg"
              title="Total Subjects"
              count={selectedData.subjects.length}
            />
            <StatisticCard
              icon={<GiTeacher size={25} color="#121212" />}
              title="Total Faculties"
              count={selectedData.faculties.length}
            />
            <StatisticCard
              icon={<FaUsers size={25} color="#121212" />}
              title="Total Students"
              count={selectedData.students.length}
            />
          </div>

          <div className="calendar basis-[15%] shadow-blue-200 shadow-sm border hover:shadow-lg  hover:shadow-blue-200 transition-all duration-300 ease-in-out rounded-md">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
