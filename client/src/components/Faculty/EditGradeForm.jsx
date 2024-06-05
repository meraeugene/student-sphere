import { useForm } from "react-hook-form";
import { FiMinus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import InputField from "../InputField";
import { updateGrades } from "../../features/grades/gradesSlice";

const EditGradeForm = ({
  student,
  toggleEditStudentGradeState,
  onStudentGradesAdded,
}) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      studentId: student.student_id,
      subjectCode: student.subject_code,
      midtermGrade: student.midterm_grade,
      finalGrade: student.final_grade,
      remarks: student.remarks,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(updateGrades(data)).unwrap();
      if (response) {
        dispatch({ type: "grades/updateGrades", payload: response });
        reset();
        onStudentGradesAdded();
        toggleEditStudentGradeState();
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
            <h1 className="text-3xl play-regular uppercase ">
              Edit Student Grades
            </h1>
            <button
              onClick={toggleEditStudentGradeState}
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
              name="username"
              label="Student ID"
              value={student.username}
              register={register}
              notEdittable
              errors={errors}
            />

            <InputField
              name="studentName"
              label="Student Name"
              value={`${student.first_name} ${student.last_name}`}
              register={register}
              notEdittable
              errors={errors}
            />

            <InputField
              name="programName"
              label="Program"
              value={student.program_name}
              register={register}
              notEdittable
              errors={errors}
            />

            <InputField
              name="yearLevel"
              label="Year Level"
              value={student.year_level}
              register={register}
              notEdittable
              errors={errors}
            />

            <InputField
              name="section"
              label="Section"
              value={student.section_name}
              register={register}
              notEdittable
              errors={errors}
            />

            <InputField
              name="semester"
              label="Semester"
              value={student.semester}
              register={register}
              notEdittable
              errors={errors}
            />

            <div className="inter">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Midterm Grade</h1>
                <select
                  className="h-[60px] border border-[#E2E8F0] outline-[#0C1E33] rounded-md px-4 w-full"
                  {...register("midtermGrade")}
                >
                  <option value="" hidden>
                    Select Midterm Grade
                  </option>
                  <option value="1.00">1.00</option>
                  <option value="1.25">1.25</option>
                  <option value="1.50">1.50</option>
                  <option value="1.75">1.75</option>
                  <option value="2.00">2.00</option>
                  <option value="2.25">2.25</option>
                  <option value="2.50">2.50</option>
                  <option value="2.75">2.75</option>
                  <option value="3.00">3.00</option>
                  <option value="4.00">4.00</option>
                  <option value="5.00">5.00</option>
                </select>
              </div>
            </div>

            <div className="inter">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Final Grade</h1>
                <select
                  className="h-[60px] border border-[#E2E8F0] outline-[#0C1E33] rounded-md px-4 w-full"
                  {...register("finalGrade")}
                >
                  <option value="" hidden>
                    Select Final Grade
                  </option>
                  <option value="1.00">1.00</option>
                  <option value="1.25">1.25</option>
                  <option value="1.50">1.50</option>
                  <option value="1.75">1.75</option>
                  <option value="2.00">2.00</option>
                  <option value="2.25">2.25</option>
                  <option value="2.50">2.50</option>
                  <option value="2.75">2.75</option>
                  <option value="3.00">3.00</option>
                  <option value="4.00">4.00</option>
                  <option value="5.00">5.00</option>
                </select>
              </div>
            </div>

            <div className="inter">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Remarks</h1>
                <select
                  className="h-[60px] border border-[#E2E8F0] outline-[#0C1E33] rounded-md px-4 w-full"
                  {...register("remarks")}
                >
                  <option value="" hidden>
                    Select Remarks
                  </option>

                  <option value="INC">INC (Incomplete)</option>
                  <option value="Withdrawn">W (Withdrawn)</option>
                  <option value="Passed">P (Pass)</option>
                  <option value="Failed">F (Fail)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-4  mt-3">
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-[#0C1E33] text-white h-[55px] rounded-md mt-  inter flex items-center justify-center gap-3"
              >
                {isSubmitting === "loading" ? (
                  <l-dot-pulse
                    size="38"
                    speed="1.3"
                    color="white"
                  ></l-dot-pulse>
                ) : (
                  <div className="flex items-center gap-3">
                    <span>Update Faculty Member</span>
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

export default EditGradeForm;
