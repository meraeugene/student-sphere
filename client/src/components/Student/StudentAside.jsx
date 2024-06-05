import React from "react";
import { logout } from "../../features/authentication/authSlice";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const AdminAside = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const location = useLocation();
  const activeClass =
    "text-white w-full bg-white font-bold  gradient flex items-center gap-3 px-4 py-2 rounded-md ";

  return (
    <div className=" w-[320px] z-10 bg-[#0C1E33] top-0 h-full overflow-y-scroll  text-white py-4 pb-0  fixed left-0 ">
      <div className="flex items-center  gap-4  border-gray-700 pb-4 border-b px-6 ">
        <img src="/images/book.png" alt="logo" width={20} />
        <h1 className="play-bold text-base uppercase">Student Sphere</h1>
      </div>

      <div className="flex items-center text-nowrap gap-4   border-gray-700 py-6 border-b px-6 ">
        <NavLink
          to="/dashboard"
          className={`flex items-center gap-3 cursor-pointer px-4 py-2 ${
            location.pathname === "/dashboard" ? activeClass : ""
          }`}
        >
          <img src="/images/dashboard.png" alt="logo" width={20} />
          <h1 className=" text-base  poppins-medium">Student Dashboard</h1>
        </NavLink>
      </div>

      <div className="users__container  border-b border-gray-700 px-6 py-8  ">
        <h1 className="text-sm poppins-regular mb-6">ACADEMICS</h1>
        <div className="flex flex-col gap-4  ">
          {/* SUBJECTS */}
          <NavLink
            to="/student/subjects"
            className={`flex items-center gap-3 cursor-pointer px-4 py-2 ${
              location.pathname === "/student/subjects" ? activeClass : ""
            }`}
          >
            <img src="/images/subjects.svg" alt="subjects" />
            <h1 className="text-base poppins-regular font-base">Subjects</h1>
          </NavLink>
          {/* GRADES */}
          <NavLink
            to="/student/grades"
            className={`flex items-center gap-3 cursor-pointer px-4 py-2 ${
              location.pathname === "/student/grades" ? activeClass : ""
            }`}
          >
            <img src="/images/grades.svg" alt="grades" />
            <h1 className="text-base poppins-regular font-base">Grades</h1>
          </NavLink>
        </div>
      </div>

      <div className="users__container  border-b border-gray-700 px-6 py-8  ">
        <h1 className="text-sm poppins-regular mb-6">SETTINGS & PRIVACY</h1>
        <div className="flex flex-col gap-4  ">
          <NavLink
            to="/profile-management"
            className={`flex items-center gap-3 cursor-pointer px-4 py-2 ${
              location.pathname === "/profile-management" ? activeClass : ""
            }`}
          >
            <img src="/images/changeprofilewhite.svg" alt="settings" />
            <h1 className=" text-base  poppins-regular font-base">
              Personal Details
            </h1>
          </NavLink>
          <NavLink
            to="/change-password"
            className={`flex items-center gap-3 cursor-pointer px-4 py-2 ${
              location.pathname === "/change-password" ? activeClass : ""
            }`}
          >
            <img src="/images/resetpass.svg" alt="settings" />
            <h1 className=" text-base  poppins-regular font-base">
              Password and Security
            </h1>
          </NavLink>
        </div>
      </div>

      <div className="logout__container px-6  py-6 cursor-pointer ">
        <div className="flex items-center gap-3 px-3" onClick={logoutHandler}>
          <img src="/images/logout.png" alt="logout" />
          <h1 className=" text-base  poppins-regular font-base">Logout</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminAside;
