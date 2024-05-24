import React from "react";
import InputField from "../InputField";
import { useForm } from "react-hook-form";
import { FiMinus } from "react-icons/fi";

const AssignSubjectsRegisterForm = ({ toggleAssignSubjectState }) => {
  // Use react hoook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="overlay fixed inset-0 z-10 bg-[rgba(210,210,215,0.35)] backdrop-blur-[4px] transition-all duration-300 ">
      <div className="fixed-container z-20  w-full overflow-y-scroll bg-white opacity-100 transition-all duration-300 md:w-[70%] md:border md:border-r-0 md:border-t-0 md:border-l-[#d2d2d7] lg:w-1/2 rounded-md">
        <div className="p-10 add-user__container">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl play-regular uppercase ">
              Add Faculty Member{" "}
            </h1>
            <button
              onClick={toggleAssignSubjectState}
              className="bg-[#164e8e] text-white h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3"
            >
              Close
              <FiMinus size={26} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-10"
          >
            <InputField
              name="semester"
              label="Semester"
              placeholder="Semester"
              required
              register={register}
              errors={errors}
            />
            <InputField
              name="yearLevel"
              label="Year Level"
              placeholder="Year Level"
              required
              register={register}
              errors={errors}
            />
            <InputField
              name="schoolYear"
              label="School Year"
              placeholder="School Year"
              required
              register={register}
              errors={errors}
            />
            <InputField
              name="sectionId"
              label="Section Id"
              placeholder="Section Id"
              required
              register={register}
              errors={errors}
            />
            <div className="flex flex-col gap-4 mt-4 ">
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-[#0C1E33] text-white h-[55px] rounded-md mt-2  inter flex items-center justify-center gap-3"
              >
                {isSubmitting === "loading" ? (
                  <l-dot-pulse
                    size="38"
                    speed="1.3"
                    color="white"
                  ></l-dot-pulse>
                ) : (
                  <div className="flex items-center gap-3">
                    <span>Assign Subject</span>
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

export default AssignSubjectsRegisterForm;
