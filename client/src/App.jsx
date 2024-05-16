import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dotPulse } from "ldrs";
import { tailspin } from "ldrs";
import AdminAside from "./components/Admin/AdminAside";
import StudentAside from "./components/Student/StudentAside";
import FacultyAside from "./components/Faculty/FacultyAside";
import { useSelector } from "react-redux";

const App = () => {
  dotPulse.register();
  tailspin.register();

  const location = useLocation();

  // Define an array of routes where you want to hide the header
  const routesWithoutComponents = ["/", "/auth/register"];

  // Check if the current route is in the array of routes without the header
  const hideHeaderAside = routesWithoutComponents.includes(location.pathname);

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      {!hideHeaderAside && <Header />}
      <div className="flex ">
        {!hideHeaderAside && <AdminAside />}
        {userInfo?.role === "admin" && !hideHeaderAside && <AdminAside />}
        {userInfo?.role === "faculty" && !hideHeaderAside && <FacultyAside />}
        {userInfo?.role === "student" && !hideHeaderAside && <StudentAside />}
        <Outlet /> {/* Render child routes */}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={true}
        theme="light"
      />
    </div>
  );
};

export default App;
