import { useForm } from "react-hook-form";
import { resetAdminPassword } from "../features/users/usersSlice";
import { BiShowAlt, BiSolidShow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../features/authentication/authSlice";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "currentPassword":
        setShowCurrentPassword((prevShowPassword) => !prevShowPassword);
        break;
      case "newPassword":
        setShowNewPassword((prevShowPassword) => !prevShowPassword);
        break;
      case "confirmPassword":
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New Password and Confirm Password do not match");
      return;
    }
    try {
      await dispatch(
        resetAdminPassword({ ...data, user_id: userInfo.user_id })
      ).unwrap();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full ml-[320px] overflow-auto">
      <div className="px-8 py-10 pb-16">
        <div className="flex items-center gap-3 mb-10">
          <img src="/images/resetpassblack.svg" alt="change profile" />
          <h1 className="text-2xl poppins-medium uppercase">
            Password and Security
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-1/2"
        >
          <h1 className="text-2xl poppins-medium uppercase">Password Reset</h1>
          <label htmlFor="currentPassword" className="inter">
            <div className="w-full flex flex-col gap-2">
              <h1 className="font-semibold">Current Password</h1>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className={`${
                    errors.currentPassword ? "border-[2px] border-red-500" : ""
                  } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full`}
                  {...register("currentPassword", {
                    required: "Current Password is required",
                  })}
                />
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 right-3"
                  onClick={() => togglePasswordVisibility("currentPassword")}
                >
                  {showCurrentPassword ? (
                    <BiShowAlt fontSize={24} className="cursor-pointer" />
                  ) : (
                    <BiSolidShow fontSize={24} className="cursor-pointer" />
                  )}
                </div>
                {errors.currentPassword && (
                  <div className="text-red-500 font-semibold mt-2">
                    {errors.currentPassword.message}
                  </div>
                )}
              </div>
            </div>
          </label>

          <label htmlFor="newPassword" className="inter">
            <div className="w-full flex flex-col gap-2">
              <h1 className="font-semibold">New Password</h1>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className={`${
                    errors.newPassword ? "border-[2px] border-red-500" : ""
                  } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full`}
                  {...register("newPassword", {
                    required: "New Password is required",
                  })}
                />
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 right-3"
                  onClick={() => togglePasswordVisibility("newPassword")}
                >
                  {showNewPassword ? (
                    <BiShowAlt fontSize={24} className="cursor-pointer" />
                  ) : (
                    <BiSolidShow fontSize={24} className="cursor-pointer" />
                  )}
                </div>
                {errors.newPassword && (
                  <div className="text-red-500 font-semibold mt-2">
                    {errors.newPassword.message}
                  </div>
                )}
              </div>
            </div>
          </label>

          <label htmlFor="confirmPassword" className="inter">
            <div className="w-full flex flex-col gap-2">
              <h1 className="font-semibold">Confirm Password</h1>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`${
                    errors.confirmPassword ? "border-[2px] border-red-500" : ""
                  } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full`}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                />
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 right-3"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showConfirmPassword ? (
                    <BiShowAlt fontSize={24} className="cursor-pointer" />
                  ) : (
                    <BiSolidShow fontSize={24} className="cursor-pointer" />
                  )}
                </div>
                {errors.confirmPassword && (
                  <div className="text-red-500 font-semibold mt-2">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
            </div>
          </label>

          <div className="flex flex-col gap-4">
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-[#0C1E33] text-white h-[55px] rounded-md mt-2 inter flex items-center justify-center gap-3"
            >
              {isSubmitting === "loading" ? (
                <l-dot-pulse size="38" speed="1.3" color="white"></l-dot-pulse>
              ) : (
                <div className="flex items-center gap-3">
                  <span>Change Password</span>
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
  );
};

export default ChangePassword;
