import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RiAdminFill } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import AdminLoginForm from "../components/Admin/AdminLoginForm";
import FacultyLoginForm from "../components/Faculty/FacultyLoginForm";
import StudentLoginForm from "../components/Student/StudentLoginForm";

const Login = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const [loginAs, setLoginAs] = useState("");

  return (
    <div className="flex w-full ">
      <div className="img__container basis-[70%] h-screen">
        <img src="/images/bg.jpg" alt="" className="h-full object-cover" />
      </div>
      <div className="main-content__container h-full basis-1/2 flex flex-col px-8   item-center justify-center      ">
        <div className="flex items-center  justify-center  gap-4 mb-12  ">
          <svg
            width="38"
            height="38"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40.3516 9.47833V31.2767C40.3516 33.055 38.9033 34.6867 37.125 34.9067L36.5566 34.98C33.55 35.3833 29.315 36.63 25.905 38.06C24.7133 38.555 23.3933 37.6567 23.3933 36.355V10.8533C23.3933 10.175 23.7783 9.55167 24.3833 9.22167C27.7383 7.40667 32.8166 5.79333 36.2633 5.5H36.3733C38.5733 5.5 40.3516 7.27833 40.3516 9.47833Z"
              fill="#0C1E33"
            />
            <path
              d="M19.6533 9.22167C16.2983 7.40667 11.22 5.79333 7.77331 5.5H7.64497C5.44497 5.5 3.66664 7.27833 3.66664 9.47833V31.2767C3.66664 33.055 5.11497 34.6867 6.89331 34.9067L7.46164 34.98C10.4683 35.3833 14.7033 36.63 18.1133 38.06C19.305 38.555 20.625 37.6567 20.625 36.355V10.8533C20.625 10.1567 20.2583 9.55167 19.6533 9.22167Z"
              fill="#0C1E33"
            />
          </svg>
          <h1 className="play-bold text-3xl uppercase">Student Sphere</h1>
        </div>

        <div className="flex flex-col gap-6">
          {!loginAs && (
            <h1 className="play-regular text-center text-4xl font-semibold ">
              Sign In to your Account
            </h1>
          )}

          {!loginAs && (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setLoginAs("Admin")}
                className="bg-[#0C1E33] text-white h-[40px] w-[150px] rounded-md mt-2 px-4 inter flex items-center justify-center gap-3"
              >
                <RiAdminFill color="white" />
                ADMIN
              </button>

              <button
                onClick={() => setLoginAs("Faculty")}
                className="bg-[#0C1E33] text-white h-[40px] w-[150px] rounded-md mt-2 px-4 inter flex items-center justify-center gap-3"
              >
                <GiTeacher color="white" />
                FACULTY
              </button>

              <button
                onClick={() => setLoginAs("Student")}
                className="bg-[#0C1E33] text-white h-[40px] w-[150px] rounded-md mt-2 px-4 inter flex items-center justify-center gap-3"
              >
                <PiStudentFill color="white" />
                STUDENT
              </button>
            </div>
          )}

          {loginAs === "Admin" && <AdminLoginForm setLoginAs={setLoginAs} />}
          {loginAs === "Faculty" && (
            <FacultyLoginForm setLoginAs={setLoginAs} />
          )}
          {loginAs === "Student" && (
            <StudentLoginForm setLoginAs={setLoginAs} />
          )}
        </div>
      </div>
      <p className="absolute bottom-[10px] text-white inter opacity-70  w-full text-center">
        © 2024 Copyrights All Rights Reserved.
      </p>
    </div>
  );
};

export default Login;
