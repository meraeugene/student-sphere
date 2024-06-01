import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import AssignScheduleRegisterForm from "../../components/AssignSchedules/AssignScheduleRegisterForm";

const AssignSchedules = () => {
  const facultyMembers = useSelector((state) => state.faculties.faculties);

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [facultySearchQuery, setFacultySearchQuery] = useState("");
  const [assignSchedule, setAssignSchedule] = useState(false);
  const [availableSections, setAvailableSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleFacultyCheckboxChange = (facultyId) => {
    // Find the selected faculty member by their ID
    const faculty = facultyMembers.find(
      (member) => member.faculty_id === facultyId
    );
    setAvailableSections(faculty.sections);

    if (faculty) {
      setSelectedFaculty(facultyId);

      // Update the form data with faculty details
      setFormData((prevFormData) => ({
        ...prevFormData,
        facultyId,
        facultyName: `${faculty.first_name} ${faculty.last_name}`,
        departmentName: faculty.department_name,
        departmentId: faculty.department_id,
        programName: faculty.program_name,
        programId: faculty.program_id,
        subject: faculty.subject_code,
      }));
    }
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section); // Store selected section ID and name

    setFormData((prevFormData) => ({
      ...prevFormData,
      sectionName: section.section_name, // Set the selected section name
    }));
  };

  // Filter faculty members based on the search query and include only those with sections
  const filteredFacultyMembers = facultyMembers.filter((facultyMember) => {
    const fullName =
      `${facultyMember.first_name} ${facultyMember.last_name}`.toLowerCase();
    const matchesQuery = fullName.includes(facultySearchQuery.toLowerCase());
    return facultyMember.sections.length > 0 && matchesQuery;
  });

  const handleAssignSchedule = () => {
    setAssignSchedule(!assignSchedule);
  };

  // const dispatch = useDispatch();

  // const handleSchedulesAdded = () => {
  //   dispatch(fetchSchedules());
  // };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Function to handle form submission
  const onSubmit = (data) => {
    // Update the formData state with the new data from the form submission
    setFormData((prevFormData) => ({
      // Retain the previous form data
      ...prevFormData,
      // Merge the new data into the form data
      ...data,
    }));

    // Toggle the state to handle schedule assignment
    handleAssignSchedule();

    reset();
    setSelectedFaculty(null);
  };

  return (
    <div className="w-full ml-[320px] overflow-auto ">
      <div className="px-8 py-10 pb-16 ">
        <div className="flex items-center gap-3 mb-10">
          <img src="/images/subjects-black.svg" alt="change profile" />
          <h1 className="text-2xl poppins-medium uppercase ">
            Assign Schedules (ONGOING)
          </h1>
        </div>

        <div className="flex gap-10">
          <div className="basis-1/2">
            <div className="flex justify-between items-center">
              <h1 className="text-xl poppins-regular">Faculty Members List</h1>
              <div className="search__container relative">
                <input
                  type="search"
                  placeholder="Search"
                  value={facultySearchQuery}
                  onChange={(e) => setFacultySearchQuery(e.target.value)}
                  className="border pl-9 pr-4 bg-[#F5F6F8] text-[#495D72] outline-none w-[250px] h-[34px] rounded-md font-medium"
                />
                <div className="absolute top-1/2 left-[10px] transform -translate-y-1/2">
                  <img src="/images/search.png" alt="search" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 mt-8 max-h-[570px] overflow-y-auto">
              {filteredFacultyMembers.length > 0 ? (
                filteredFacultyMembers.map((facultyMember) => (
                  <label
                    key={facultyMember.faculty_id}
                    className={`shadow-md border transition-all duration-300 ease-in-out rounded-md p-4 flex justify-between cursor-pointer ${
                      selectedFaculty === facultyMember.faculty_id
                        ? "shadow-lg border-blue-300 shadow-blue-300"
                        : "hover:shadow-lg"
                    }`}
                  >
                    <div>
                      <h1 className="text-lg poppins-regular mb-2">
                        {facultyMember.first_name} {facultyMember.last_name}
                      </h1>
                      <div className="flex flex-col gap-1">
                        <h2 className="poppins-regular">
                          <span className="poppins-medium">Department:</span>{" "}
                          {facultyMember.department_name}
                        </h2>
                        <h2 className="poppins-regular">
                          <span className="poppins-medium">Program:</span>{" "}
                          {facultyMember.program_name}
                        </h2>
                        <h2 className="poppins-regular">
                          <span className="poppins-medium">Subject:</span>{" "}
                          {facultyMember.subject_code
                            ? facultyMember.subject_code
                            : "N/A"}
                        </h2>
                        <div className="poppins-regular flex items-center gap-2">
                          <span className="poppins-medium">Sections:</span>{" "}
                          <div className="flex items-center gap-2">
                            {facultyMember.sections.length > 0 ? (
                              facultyMember.sections.map((section, index) => (
                                <span
                                  className="border shadow-sm py-[1px] px-2 rounded-sm"
                                  key={index}
                                >
                                  {section.section_name}
                                </span>
                              ))
                            ) : (
                              <option>Please select a faculty first</option>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        className="mr-3 mt-1"
                        checked={selectedFaculty === facultyMember.faculty_id}
                        onChange={() =>
                          handleFacultyCheckboxChange(facultyMember.faculty_id)
                        }
                      />
                    </div>
                  </label>
                ))
              ) : (
                <div className="text-lg text-gray-500 rounded-md poppins-regular py-2 px-4 border">
                  No faculty found. Please try again.
                </div>
              )}
            </div>
          </div>

          <div className="basis-1/2">
            <h1 className="text-xl poppins-regular">Assign Schedules</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6  mt-10"
            >
              <label htmlFor="section" className="inter  ">
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold">Section</h1>
                  <div className="w-full">
                    <select
                      {...register("sectionId", {
                        required: "Section is required",
                      })}
                      className={`${
                        errors.sectionId ? "border-[2px] border-red-500" : ""
                      } h-[60px] border border-[#E2E8F0] outline-[#0C1E33] rounded-md px-4 w-full `}
                      onChange={(e) =>
                        handleSectionSelect(
                          availableSections.find(
                            (section) =>
                              section.section_id === Number(e.target.value)
                          )
                        )
                      }
                    >
                      {!selectedFaculty && ( // Conditionally render if no faculty is selected
                        <option value="">Please select a faculty first</option>
                      )}
                      <option hidden value="">
                        Select Section
                      </option>
                      {availableSections.map((section, index) => {
                        return (
                          <option key={index} value={section.section_id}>
                            {section.section_name}
                          </option>
                        );
                      })}
                    </select>

                    {errors.sectionId && (
                      <div className="text-red-500 font-semibold mt-2">
                        {errors.sectionId.message}
                      </div>
                    )}
                  </div>
                </div>
              </label>

              <label htmlFor="semester" className="inter  ">
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold">Day</h1>
                  <div className="w-full">
                    <select
                      {...register("day", {
                        required: "Day is required",
                      })}
                      className={`${
                        errors.day ? "border-[2px] border-red-500" : ""
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
                    {errors.day && (
                      <div className="text-red-500 font-semibold mt-2">
                        {errors.day.message}
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
                      <span>Assign Schedule</span>
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

        {assignSchedule && (
          <AssignScheduleRegisterForm
            toggleAssignScheduleState={handleAssignSchedule}
            formData={formData}
            // schedulesAdded={handleSchedulesAdded}
          />
        )}
      </div>
    </div>
  );
};

export default AssignSchedules;
