import React from "react";
import { useSelector } from "react-redux";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import StudentDashboard from "./Student/StudentDashboard";
import FacultyDashboard from "./Faculty/FacultyDashboard";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {userInfo.role === "student" ? (
        <StudentDashboard />
      ) : userInfo.role === "admin" ? (
        <AdminDashboard />
      ) : userInfo.role === "faculty" ? (
        <FacultyDashboard />
      ) : null}
    </>
  );
};

export default Dashboard;
