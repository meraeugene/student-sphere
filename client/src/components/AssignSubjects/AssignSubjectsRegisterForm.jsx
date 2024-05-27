import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import { useForm } from "react-hook-form";
import { FiMinus } from "react-icons/fi";
import { useSelector } from "react-redux";
import Select from "react-select";

const AssignSubjectsRegisterForm = ({
  toggleAssignSubjectState,
  selectedFaculty,
  selectedSubject,
}) => {
  // Use react hoook form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const sections = useSelector((state) => state.sections.sections);
  const subjects = useSelector((state) => state.subjects.subjects);
  const facultyMembers = useSelector((state) => state.faculties.faculties);

  const [filteredSections, setFilteredSections] = useState([]);

  useEffect(() => {
    if (selectedFaculty && selectedSubject) {
      const faculty = facultyMembers.find(
        (faculty) => faculty.faculty_id === selectedFaculty
      );
      const subject = subjects.find(
        (subject) => subject.subject_code === selectedSubject
      );
      if (faculty && subject) {
        const programName = faculty.program_name;
        setFilteredSections(
          sections.filter((section) => section.program_name === programName)
        );
      }
    }
  }, [selectedFaculty, selectedSubject, facultyMembers, subjects, sections]);

  useEffect(() => {
    register("sectionIds", { required: "At least one section is required" });
  }, [register]);

  const onSectionChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setValue("sectionIds", values);
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      facultyId: selectedFaculty,
      sectionIds: data.sectionIds || [], // Ensure sectionIds is an array
    };
    console.log(formData);
  };

  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "60px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#E2E8F0",
      padding: "0.3em",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#0C1E33",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#0C1E33",
      ":hover": {
        backgroundColor: "#0C1E33",
        color: "white",
      },
    }),
  };

  return (
    <div className="overlay fixed inset-0 z-10 bg-[rgba(210,210,215,0.35)] backdrop-blur-[4px] transition-all duration-300 ">
      <div className="fixed-container z-20  w-full overflow-y-scroll bg-white opacity-100 transition-all duration-300 md:w-[70%] md:border md:border-r-0 md:border-t-0 md:border-l-[#d2d2d7] lg:w-1/2 rounded-md">
        <div className="p-10 add-user__container">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl play-regular uppercase ">
              Add Subject To Faculty Member
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
            <label htmlFor="semester" className="inter  ">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <h1 className="font-semibold">Semester</h1>
                  <span className="text-red-500">*</span>
                </div>
                <div className="w-full">
                  <select
                    name="semester"
                    {...register("semester", {
                      required: "Semester  is required",
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

            <InputField
              name="schoolYear"
              label="School Year"
              placeholder="School Year"
              register={register}
              errors={errors}
              required
            />
            <InputField
              name="subjectCode"
              label="Subject Code"
              placeholder="Subject Code"
              value={selectedSubject}
              register={register}
              errors={errors}
              notEdittable
              required
            />
            <InputField
              name="facultyId"
              label="Faculty Id"
              notEdittable
              required
              value={selectedFaculty}
              register={register}
              errors={errors}
            />
            <label htmlFor="sectionIds" className="inter">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <h1 className="font-semibold">Sections</h1>
                  <span className="text-red-500">*</span>
                </div>
                <div className="w-full">
                  <Select
                    options={filteredSections.map((section) => ({
                      value: section.section_id,
                      label: section.section_name,
                    }))}
                    isMulti
                    placeholder="Select or search a sections..."
                    onChange={onSectionChange}
                    styles={customStyles}
                    className={`${
                      errors.sectionIds
                        ? "border-[2px] border-red-500"
                        : "hx-[60px] "
                    }`}
                  />
                  {errors.sectionIds && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.sectionIds.message}
                    </div>
                  )}
                </div>
              </div>
            </label>

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
