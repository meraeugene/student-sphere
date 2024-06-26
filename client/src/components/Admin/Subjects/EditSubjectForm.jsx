import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../InputField";
import { useEffect } from "react";
import { updateSubject } from "../../../features/subjects/subjectsSlice";

const EditSubjectForm = ({
  subject,
  toggleEditSubjectState,
  onSubjectAdded,
}) => {
  const dispatch = useDispatch();
  const { departmentNames } = useSelector((state) => state.departments);
  const { programs } = useSelector((state) => state.programs);

  const [filteredPrograms, setFilteredPrograms] = useState([]);

  useEffect(() => {
    const initialFilteredPrograms = programs.filter(
      (program) => program.department_id === subject.department_id
    );
    setFilteredPrograms(initialFilteredPrograms);
  }, [subject.department_id, programs]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      subjectCode: subject.subject_code,
      subjectName: subject.subject_name,
      status: subject.status,
      unit: subject.unit,
      yearLevel: subject.year_level,
      semester: subject.semester,
      departmentId: subject.department_id,
      programId: subject.program_id,
    },
  });

  useEffect(() => {
    setValue("programId", subject.program_id);
  }, [setValue, subject.program_id, filteredPrograms]);

  const handleDepartmentChange = (event) => {
    const selectedDepartment = Number(event.target.value);
    const filtered = programs.filter(
      (program) => program.department_id === selectedDepartment
    );
    setFilteredPrograms(filtered);
  };

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(updateSubject(data)).unwrap();
      if (response) {
        dispatch({ type: "subjects/updateSubject", payload: response });
        reset();
        onSubjectAdded();
        toggleEditSubjectState();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay fixed inset-0 z-10 bg-[rgba(210,210,215,0.35)] backdrop-blur-[4px] transition-all duration-300">
      <div className="fixed-container z-20 w-full  h-[90vh] overflow-y-scroll bg-white opacity-100 transition-all duration-300 md:w-[70%] md:border md:border-r-0 md:border-t-0 md:border-l-[#d2d2d7] lg:w-1/2 rounded-md">
        <div className="p-10 add-user__container">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl play-regular uppercase ">Edit Subject</h1>
            <button
              onClick={toggleEditSubjectState}
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
              name="subjectCode"
              label="Subject Code "
              notEdittable={true}
              register={register}
              errors={errors}
              readOnly
            />

            <InputField
              name="subjectName"
              label="Subject Name"
              placeholder="Subject Name"
              register={register}
              errors={errors}
            />

            <label htmlFor="status" className="inter  ">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Status</h1>
                <div className="w-full">
                  <select
                    name="status"
                    {...register("status", {
                      required: "Status is required",
                    })}
                    className={`${
                      errors.status ? "border-[2px] border-red-500" : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33] rounded-md px-4 w-full `}
                  >
                    <option value="" hidden>
                      Select Status
                    </option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {errors.status && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.status.message}
                    </div>
                  )}
                </div>
              </div>
            </label>

            <InputField
              name="unit"
              label="Unit"
              required
              type="number"
              register={register}
              errors={errors}
            />

            <label className="inter">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Year Level</h1>
                <div className="w-full">
                  <select
                    name="yearLevel"
                    {...register("yearLevel", {
                      required: "Year Level is required",
                    })}
                    className={`${
                      errors.yearLevel ? "border-[2px] border-red-500" : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33] rounded-md px-4 w-full`}
                  >
                    <option value="" hidden>
                      Select Year Level
                    </option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                  {errors.yearLevel && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.yearLevel.message}
                    </div>
                  )}
                </div>
              </div>
            </label>

            <label htmlFor="semester" className="inter  ">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Semester</h1>
                <div className="w-full">
                  <select
                    name="semester"
                    {...register("semester", {
                      required: "Semester is required",
                    })}
                    className={`${
                      errors.semester ? "border-[2px] border-red-500" : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33] rounded-md px-4 w-full `}
                  >
                    <option value="" hidden>
                      Select Semester
                    </option>
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                  </select>
                  {errors.semester && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.semester.message}
                    </div>
                  )}
                </div>
              </div>
            </label>

            <label className="inter">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Department</h1>
                <div className="w-full">
                  <select
                    name="departmentId"
                    {...register("departmentId", {
                      required: "Department Name is required",
                    })}
                    onChange={handleDepartmentChange}
                    className="h-[60px] border border-[#E2E8F0] outline-[#0C1E33] rounded-md px-4 w-full"
                  >
                    <option value="" hidden>
                      Select Department
                    </option>
                    {departmentNames.map((department, index) => (
                      <option key={index} value={department.department_id}>
                        {department.department_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </label>

            <label className="inter">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Program</h1>
                <div className="w-full">
                  <select
                    name="programId"
                    {...register("programId", {
                      required: "Program Name is required",
                    })}
                    className={`${
                      errors.programId ? "border-[2px] border-red-500" : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33] rounded-md px-4 w-full`}
                  >
                    <option value="" hidden>
                      Select Program
                    </option>
                    {filteredPrograms.length > 0 ? (
                      filteredPrograms.map((program, index) => (
                        <option key={index} value={program.program_id}>
                          {program.program_name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No Program Available
                      </option>
                    )}
                  </select>
                  {errors.programId && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.programId.message}
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
                {isSubmitting === "loading" ? (
                  <l-dot-pulse
                    size="38"
                    speed="1.3"
                    color="white"
                  ></l-dot-pulse>
                ) : (
                  <div className="flex items-center gap-3">
                    <span>Update Subject</span>
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

export default EditSubjectForm;
