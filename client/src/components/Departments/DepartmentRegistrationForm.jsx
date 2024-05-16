import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiMinus } from "react-icons/fi";
import axios from "axios";

const DepartmentRegistrationForm = ({ toggleAddDepartmentState }) => {
  // Use react hoook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const { departmentName, departmentHead, departmentLocation } = data;

      const formData = new FormData();

      formData.append("departmentName", departmentName);
      formData.append("departmentHead", departmentHead);
      formData.append("departmentLocation", departmentLocation);

      const response = await axios.post(
        "http://localhost/student-sphere/server/Departments/registerDepartment.php",
        formData
      );

      //   Reset the form if the submission is successful
      reset();

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="overlay fixed inset-0 z-10 bg-[rgba(210,210,215,0.35)] backdrop-blur-[4px] transition-all duration-300 ">
      <div className="fixed-container z-20  w-full overflow-y-scroll bg-white opacity-100 transition-all duration-300 md:w-[70%] md:border md:border-r-0 md:border-t-0 md:border-l-[#d2d2d7] lg:w-1/2 rounded-md">
        <div className="p-10 add-user__container">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl play-regular uppercase mb-6">
              Add Department{" "}
            </h1>
            <button
              onClick={toggleAddDepartmentState}
              className="bg-[#164e8e] text-white h-[40px] rounded-md mt-2 px-4 inter flex items-center justify-center gap-3"
            >
              Close
              <FiMinus size={26} />
            </button>
          </div>

          {/* ADMIN FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6   "
          >
            <label htmlFor="departmentName" className="inter  ">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Department Name</h1>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Department Name"
                    name="departmentName"
                    {...register("departmentName", {
                      required: "Department Name is required",
                    })}
                    className={`${
                      errors.departmentName ? "border-[2px] border-red-500" : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full `}
                  />
                  {errors.departmentName && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.departmentName.message}
                    </div>
                  )}
                </div>
              </div>
            </label>

            <label htmlFor="departmentHead" className="inter  ">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Department Head</h1>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Department Head"
                    name="departmentHead"
                    {...register("departmentHead", {
                      required: "Department Head is required",
                    })}
                    className={`${
                      errors.departmentHead ? "border-[2px] border-red-500" : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full `}
                  />
                  {errors.departmentHead && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.departmentHead.message}
                    </div>
                  )}
                </div>
              </div>
            </label>

            <label htmlFor="departmentLocation" className="inter  ">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Department Location</h1>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Department Head"
                    name="departmentLocation"
                    {...register("departmentLocation", {
                      required: "Department Location is required",
                    })}
                    className={`${
                      errors.departmentLocation
                        ? "border-[2px] border-red-500"
                        : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full `}
                  />
                  {errors.departmentLocation && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.departmentLocation.message}
                    </div>
                  )}
                </div>
              </div>
            </label>

            <div className="flex flex-col gap-4 ">
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-[#0C1E33] text-white h-[55px] rounded-md mt-2 w-[200px] inter flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <l-dot-pulse
                    size="38"
                    speed="1.3"
                    color="white"
                  ></l-dot-pulse>
                ) : (
                  <div className="flex items-center gap-3">
                    <span>Add Department</span>
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
  );
};

export default DepartmentRegistrationForm;
