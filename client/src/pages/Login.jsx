import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BiShowAlt, BiSolidShow } from "react-icons/bi";
import { setCredentials } from "../features/authentication/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.user_id) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Use react hoook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { username, password } = data;

      const formData = new FormData();

      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post(
        "http://localhost/student-sphere/server/Users/login.php",
        formData
      );

      dispatch(setCredentials(response.data));

      const { redirect_uri } = response.data;
      navigate(redirect_uri);
      reset();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.error);
    }
  };

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
          <h1 className="play-regular text-center text-4xl font-semibold ">
            Sign In to your Account
          </h1>

          <div className="px-20">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 mt-4"
            >
              <label htmlFor="facultyId" className="inter  ">
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold">Username</h1>
                  <div className="w-full">
                    <input
                      type="text"
                      {...register("username", {
                        required: "Username is required",
                      })}
                      className={`${
                        errors.username ? "border-[2px] border-red-500" : ""
                      } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full `}
                    />
                    {errors.username && (
                      <div className="text-red-500 font-semibold mt-2">
                        {errors.username.message}
                      </div>
                    )}
                  </div>
                </div>
              </label>

              <label htmlFor="password" className="inter  ">
                <div className="w-full flex flex-col gap-2">
                  <h1 className="font-semibold">Password</h1>
                  <div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`${
                          errors.password ? "border-[2px] border-red-500" : ""
                        } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full `}
                        name="password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />
                      <div
                        className="absolute top-1/2 transform -translate-y-1/2 right-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <BiShowAlt fontSize={24} className="cursor-pointer" />
                        ) : (
                          <BiSolidShow
                            fontSize={24}
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                    {errors.password && (
                      <div className="text-red-500 font-semibold mt-2">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </div>
              </label>

              <div className="flex flex-col gap-4 ">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="bg-[#0C1E33] text-white h-[55px] rounded-md mt-2  inter flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <l-dot-pulse
                      size="38"
                      speed="1.3"
                      color="white"
                    ></l-dot-pulse>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span>Sign In</span>
                      <svg
                        width="18"
                        height="14"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 7H17M17 7L11 1M17 7L11 13"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <p className="absolute bottom-[10px] text-white inter opacity-70  w-full text-center">
        © 2024 Copyrights All Rights Reserved.
      </p>
    </div>
  );
};

export default Login;
