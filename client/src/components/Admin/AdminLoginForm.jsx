import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authentication/authSlice";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BiShowAlt, BiSolidShow } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";

const AdminLoginForm = ({ setLoginAs }) => {
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        "http://localhost/student-sphere/server/Admins/loginAdmin.php",
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
    <div className="px-20">
      <button
        onClick={() => setLoginAs(false)}
        className="bg-[#0C1E33] text-white h-[40px] w-[130px]  rounded-md mt-2 mb-12  inter flex items-center justify-center gap-3"
      >
        <IoIosArrowRoundBack fontSize={24} />
        Go Back
      </button>

      <div className="flex items-center gap-2 justify-center play-regular text-center text-4xl font-semibold ">
        <h1> Sign In as</h1>
        <div className="flex items-center gap-2">
          <RiAdminFill color="#0C1E33" size={24} />
          <span>Admin</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6   mt-10"
      >
        <label htmlFor="username" className="inter  ">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Username</h1>
            <div className="w-full">
              <input
                type="text"
                placeholder="Username"
                name="username"
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
                  placeholder="Password"
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
                    <BiSolidShow fontSize={24} className="cursor-pointer" />
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
              <l-dot-pulse size="38" speed="1.3" color="white"></l-dot-pulse>
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
  );
};

export default AdminLoginForm;
