import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import { useForm } from "react-hook-form";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { customStyles } from "../../utils/customStyles";
import { assignSubjectsToFaculty } from "../../features/faculties/facultiesSlice";
import { useNavigate } from "react-router-dom";

const AssignSubjectsRegisterForm = ({
  toggleAssignSubjectState,
  selectedFaculty,
  selectedSubject,
  assignedFacultySubjectsAdded,
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
  const [facultyName, setFacultyName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [semester, setSemester] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedFaculty && selectedSubject) {
      const faculty = facultyMembers.find(
        (faculty) => faculty.faculty_id === selectedFaculty
      );
      const subject = subjects.find(
        (subject) => subject.subject_code === selectedSubject
      );
      if (faculty && subject) {
        setFacultyName(`${faculty.first_name} ${faculty.last_name}`);
        setSubjectName(subject.subject_name);
        setSemester(subject.semester);

        const programName = faculty.program_name;
        const yearLevel = subject.year_level;

        setFilteredSections(
          sections.filter(
            (section) =>
              section.program_name === programName &&
              section.year_level === yearLevel
          )
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

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      facultyId: selectedFaculty,
      facultyName,
      sectionIds: data.sectionIds || [], // Ensure sectionIds is an array
      subjectName,
      semester,
    };

    console.log(formData);

    try {
      await dispatch(assignSubjectsToFaculty(formData)).unwrap();
      reset();
      assignedFacultySubjectsAdded();
      navigate("/admin/faculties");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay fixed inset-0 z-10 bg-[rgba(210,210,215,0.35)] backdrop-blur-[4px] transition-all duration-300 ">
      <div className="fixed-container z-20 h-[90vh]  w-full overflow-y-scroll bg-white opacity-100 transition-all duration-300 md:w-[70%] md:border md:border-r-0 md:border-t-0 md:border-l-[#d2d2d7] lg:w-1/2 rounded-md">
        <div className="p-10 add-user__container">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl play-regular uppercase ">
              Assign Subject To Faculty Member
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
              name="facultyName"
              label="Faculty Name"
              placeholder="Faculty Name"
              value={facultyName}
              register={register}
              errors={errors}
              notEdittable
            />

            <InputField
              name="subjectCode"
              label="Subject Code"
              placeholder="Subject Code"
              value={selectedSubject}
              register={register}
              errors={errors}
              notEdittable
            />
            <InputField
              name="subjectName"
              label="Subject Name"
              placeholder="Subject Name"
              value={subjectName}
              register={register}
              errors={errors}
              notEdittable
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
                        ? "border-[2px]  border-red-500 rounded-md"
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

            <InputField
              name="semester"
              label="Semester"
              notEdittable
              value={semester}
              register={register}
              errors={false}
            />

            <label htmlFor="semester" className="inter  ">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <h1 className="font-semibold">Day</h1>
                  <span className="text-red-500">*</span>
                </div>
                <div className="w-full">
                  <select
                    {...register("dayOfWeek", {
                      required: "Day is required",
                    })}
                    className={`${
                      errors.dayOfWeek ? "border-[2px] border-red-500" : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33] rounded-md px-4 w-full `}
                  >
                    <option value="" hidden>
                      Select Day
                    </option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                  {errors.dayOfWeek && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.dayOfWeek.message}
                    </div>
                  )}
                </div>
              </div>
            </label>

            <InputField
              name="timeSlot"
              label="Time Slot"
              placeholder="7:30 AM - 10:30 AM"
              register={register}
              errors={errors}
              required
            />

            <InputField
              name="schoolYear"
              label="School Year"
              placeholder="School Year"
              register={register}
              errors={errors}
              required
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
