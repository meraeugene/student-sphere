import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../InputField";
import { updateStudent } from "../../features/students/studentsSlice";

const EditStudentForm = ({
  student,
  toggleEditStudentState,
  onStudentAdded,
}) => {
  const dispatch = useDispatch();
  const { sections } = useSelector((state) => state.sections);

  const [filteredSections, setFilteredSections] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: student.username,
      firstName: student.first_name,
      lastName: student.last_name,
      gender: student.gender,
      address: student.address,
      email: student.email,
      birthday: student.date_of_birth,
      phoneNumber: student.phone_number,
      enrollmentStatus: student.enrollment_status,
      yearLevel: student.year_level,
      semester: student.semester,
      sectionId: student.section_id,
      departmentId: student.department_id,
      programId: student.program_id,
    },
  });

  useEffect(() => {
    if (student) {
      const programName = student.program_name;
      const yearLevel = student.year_level;

      setFilteredSections(
        sections.filter(
          (section) =>
            section.program_name === programName &&
            section.year_level === yearLevel
        )
      );
    }
  }, [student, sections]);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(
        updateStudent({
          ...data,
          studentId: student.student_id,
        })
      ).unwrap();
      if (response) {
        dispatch({ type: "students/updateStudent", payload: response });
        reset();
        onStudentAdded();
        toggleEditStudentState();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay fixed inset-0 z-10 bg-[rgba(210,210,215,0.35)] backdrop-blur-[4px] transition-all duration-300">
      <div className="fixed-container z-20 w-full h-[90vh]  overflow-y-scroll bg-white opacity-100 transition-all duration-300 md:w-[70%] md:border md:border-r-0 md:border-t-0 md:border-l-[#d2d2d7] lg:w-1/2 rounded-md">
        <div className="p-10 add-user__container">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl play-regular uppercase ">Edit Student</h1>
            <button
              onClick={toggleEditStudentState}
              className="bg-[#164e8e] text-white h-[40px] rounded-md  px-4 inter flex items-center justify-center gap-3"
            >
              Close
              <FiMinus size={26} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-10  "
          >
            <InputField
              name="Username"
              label="Username"
              placeholder="2022304365"
              value={student.username}
              notEdittable
              register={register}
              errors={errors}
            />

            <InputField
              name="firstName"
              label="First Name"
              placeholder="First Name"
              pattern={/^[a-zA-Z\s]+$/}
              register={register}
              errors={errors}
            />

            <InputField
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              pattern={/^[a-zA-Z\s]+$/}
              register={register}
              errors={errors}
            />

            <label className="inter">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Gender</h1>
                <div className="flex items-center gap-4">
                  {["Male", "Female"].map((gender) => (
                    <label key={gender} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={gender}
                        name="gender"
                        {...register("gender", {
                          required: "Gender is required",
                        })}
                        className="h-5 w-5 text-blue-500"
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && (
                  <div className="text-red-500 font-semibold">
                    {errors.gender.message}
                  </div>
                )}
              </div>
            </label>

            <InputField
              name="email"
              label="Email Address"
              placeholder="Email Address"
              pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
              register={register}
              errors={errors}
            />

            <InputField
              name="birthday"
              label="Date of Birth"
              type="date"
              register={register}
              errors={errors}
            />

            <InputField
              name="address"
              label="Address"
              placeholder="Address"
              register={register}
              errors={errors}
            />

            <InputField
              name="phoneNumber"
              label="Phone Number"
              placeholder="0918391841"
              register={register}
              errors={errors}
            />

            <InputField
              name="enrollmentStatus"
              label="Enrollment Status"
              notEdittable
              register={register}
              errors={errors}
            />

            <InputField
              name="departmentId"
              label="Department"
              value={student.department_name}
              notEdittable
              register={register}
              errors={errors}
            />

            <InputField
              name="programId"
              label="Program"
              value={student.program_name}
              notEdittable
              register={register}
              errors={errors}
            />

            <InputField
              name="yearLevel"
              label="Year Level"
              value={student.year_level}
              notEdittable
              register={register}
              errors={errors}
            />

            <InputField
              name="semester"
              label="Semester"
              value={student.semester}
              notEdittable
              register={register}
              errors={errors}
            />

            <label className="inter">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Section</h1>
                <div className="w-full">
                  <select
                    {...register("sectionId", {
                      required: "Section Name is required",
                    })}
                    className={`${
                      errors.sectionId ? "border-[2px] border-red-500" : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33] rounded-md px-4 w-full`}
                  >
                    <option value="" hidden>
                      Select Section
                    </option>
                    {filteredSections.map((section, index) => (
                      <option key={index} value={section.section_id}>
                        {section.section_name}
                      </option>
                    ))}
                  </select>
                  {errors.sectionId && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.sectionId.message}
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
                    <span>Update Student</span>
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

export default EditStudentForm;
