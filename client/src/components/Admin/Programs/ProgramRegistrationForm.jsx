import { useForm } from "react-hook-form";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addProgram } from "../../../features/programs/programsSlice";
import InputField from "../../../components/InputField";

const ProgramRegistrationForm = ({ toggleAddProgramState, onProgramAdded }) => {
  const dispatch = useDispatch();
  const { departmentNames, status } = useSelector((state) => state.departments);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(addProgram(data)).unwrap();
      reset();
      onProgramAdded();
      toggleAddProgramState();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay fixed inset-0 z-10 bg-[rgba(210,210,215,0.35)] backdrop-blur-[4px] transition-all duration-300 ">
      <div className="fixed-container z-20  w-full overflow-y-scroll bg-white opacity-100 transition-all duration-300 md:w-[70%] md:border md:border-r-0 md:border-t-0 md:border-l-[#d2d2d7] lg:w-1/2 rounded-md">
        <div className="p-10 add-user__container">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl play-regular uppercase ">Add Program </h1>
            <button
              onClick={toggleAddProgramState}
              className="bg-[#164e8e] text-white h-[40px] rounded-md  px-4 inter flex items-center justify-center gap-3"
            >
              Close
              <FiMinus size={26} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-10   "
          >
            <InputField
              name="programName"
              label="Program Name"
              placeholder="Program Name"
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

            <label htmlFor="departmentName" className="inter  ">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <h1 className="font-semibold">Department</h1>
                  <span className="text-red-500">*</span>
                </div>
                <div className="w-full">
                  <select
                    name="departmentName"
                    {...register("departmentId", {
                      required: "Department Name  is required",
                    })}
                    className={`${
                      errors.departmentId ? "border-[2px] border-red-500" : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33] rounded-md px-4 w-full `}
                  >
                    <option value="" hidden>
                      Select Department
                    </option>
                    {departmentNames &&
                      departmentNames.map((department, index) => (
                        <option key={index} value={department.department_id}>
                          {department.department_name}
                        </option>
                      ))}
                  </select>
                  {errors.departmentId && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.departmentId.message}
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
                {isSubmitting || status === "loading" ? (
                  <l-dot-pulse
                    size="38"
                    speed="1.3"
                    color="white"
                  ></l-dot-pulse>
                ) : (
                  <div className="flex items-center gap-3">
                    <span>Add Program</span>
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

export default ProgramRegistrationForm;
