import React from "react";
import { useForm } from "react-hook-form";
import { FiMinus } from "react-icons/fi";
import InputField from "../../components/InputField";
import { useDispatch } from "react-redux";
import { addGrades } from "../../features/grades/gradesSlice";

const GradeForm = ({
  student,
  toggleAddStudentGradeState,
  onStudentGradesAdded,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        studentId: student.student_id,
        subjectCode: student.subject_code,
      };

      dispatch(addGrades(formData));
      toggleAddStudentGradeState();
      onStudentGradesAdded();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay fixed inset-0 z-10 bg-[rgba(210,210,215,0.35)] backdrop-blur-[4px] transition-all duration-300 ">
      <div className="fixed-container h-[90vh] z-20  w-full overflow-y-scroll bg-white opacity-100 transition-all duration-300 md:w-[70%] md:border md:border-r-0 md:border-t-0 md:border-l-[#d2d2d7] lg:w-1/2 rounded-md">
        <div className="p-10 add-user__container">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl play-regular uppercase ">Add Grade </h1>
            <button
              onClick={toggleAddStudentGradeState}
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
                  <option value="INC">INC (Incomplete)</option>
                  <option value="W">W (Withdrawn)</option>
                  <option value="P">P (Pass)</option>
                  <option value="F">F (Fail)</option>
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

            <div className="flex flex-col gap-4">
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-[#0C1E33] text-white h-[55px] rounded-md mt-2 inter flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <span>Submit Grade</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GradeForm;
