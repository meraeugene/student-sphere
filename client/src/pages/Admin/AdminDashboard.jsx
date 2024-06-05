import React, { useEffect, useState } from "react";
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

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost/student-sphere/server/Users/getUserProfile.php?user_id=${userInfo.user_id}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userInfo.user_id]);

  // Check if profile is null before accessing its properties
  const firstName = profile ? capitalizeFirstLetter(profile.first_name) : "";
  const lastName = profile ? capitalizeFirstLetter(profile.last_name) : "";

  // Render the rest of the component once profile is fetched
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
  }, []);

  return (
    <main className="w-full flex ml-[320px] h-screen">
      <div className="left__container basis-[80%]">
        <div className="welcome__container py-6 px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/hello.png" alt="" />
              <h1 className="text-2xl poppins-regular">
                Welcome, {firstName} {lastName}!
              </h1>
            </div>
            <h1 className="poppins-regular text-[#495D72] text-sm">
              {currentDate}
            </h1>
          </div>
        </div>
      </div>

      <div className="right__container basis-[20%] bg-gray-100 h-full"></div>
    </main>
  );
};

export default AdminDashboard;
