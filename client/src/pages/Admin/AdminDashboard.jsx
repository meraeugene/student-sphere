import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { fetchDepartmentNames } from "../../features/departments/departmentsSlice";
import {
  fetchProgramNames,
  fetchPrograms,
} from "../../features/programs/programsSlice";
import { fetchSubjects } from "../../features/subjects/subjectsSlice";
import { fetchFaculties } from "../../features/faculties/facultiesSlice";
import { fetchSections } from "../../features/sections/sectionsSlice";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const capitalizedFirstName = capitalizeFirstLetter(userInfo.firstName);
  const capitalizedLastName = capitalizeFirstLetter(userInfo.lastName);

  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "long",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDepartmentNames());
    dispatch(fetchPrograms());
    dispatch(fetchProgramNames());
    dispatch(fetchSubjects());
    dispatch(fetchFaculties());
    dispatch(fetchSections());
  }, [dispatch]);

  return (
    <main className=" w-full  flex  ml-[300px] h-screen  ">
      <div className="left__container basis-[80%] ">
        <div className="welcome__container py-6 px-8 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 ">
              <img src="/images/hello.png" alt="" />
              <h1 className="text-2xl poppins-regular">
                Welcome, {capitalizedFirstName} {capitalizedLastName}!{" "}
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
