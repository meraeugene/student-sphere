import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiMinus } from "react-icons/fi";
import axios from "axios";

const StudentRegistrationForm = ({ toggleAddStudentState }) => {
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
      const {
        studentID,
        firstName,
        lastName,
        gender,
        email,
        birthday,
        address,
        phoneNumber,
        password,
        confirmPassword,
        departmentName,
      } = data;

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const formData = new FormData();

      formData.append("studentID", studentID);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("gender", gender);
      formData.append("email", email);
      formData.append("birthday", birthday);
      formData.append("address", address);
      formData.append("phoneNumber", phoneNumber);
      formData.append("departmentName", departmentName);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);

      const response = await axios.post(
        "http://localhost/student-sphere/server/Students/registerStudent.php",
        formData
      );

      // Reset the form if the submission is successful
      reset();

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const generateRandomID = () => {
    const currentYear = "2024"; // Hardcode '2024' as the starting year
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
    return `${currentYear}${randomNumber}`;
  };

  // In your component, call this function to generate the student ID
  const studentID = generateRandomID();

  const [departmentNames, setDepartmentNames] = useState([]);

  useEffect(() => {
    const fetchDepartmentNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost/student-sphere/server/Departments/departments.php"
        );
        setDepartmentNames(
          response.data.map((department) => department.department_name)
        );
      } catch (error) {
        console.error("Error fetching department names:", error);
      }
    };

    fetchDepartmentNames();
  }, []);

  return (
    <div className="overlay fixed inset-0 z-10 bg-[rgba(210,210,215,0.35)] backdrop-blur-[4px] transition-all duration-300 ">
      <div className="fixed-container z-20 h-[90vh] w-full overflow-y-scroll bg-white opacity-100 transition-all duration-300 md:w-[70%] md:border md:border-r-0 md:border-t-0 md:border-l-[#d2d2d7] lg:w-1/2 rounded-md">
        <div className="p-10 add-user__container">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl play-regular uppercase mb-6">
              Add Student
            </h1>
            <button
              onClick={toggleAddStudentState}
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
            <label htmlFor="studentID" className="inter  ">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">
                  Student ID{" "}
                  <span className="text-gray-500">(Auto-Generated)</span>
                </h1>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="2022304365"
                    name="studentID"
                    value={studentID}
                    readOnly
                    {...register("studentID")}
                    className="h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full "
                  />
                </div>
              </div>
            </label>

            <label htmlFor="fullName" className="inter  ">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Full Name</h1>
                <div className="flex gap-8">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      className={`${
                        errors.firstName ? "border-[2px] border-red-500" : ""
                      } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full `}
                      {...register("firstName", {
                        required: "First Name  is required",
                        pattern: {
                          value: /^[a-zA-Z\s]+$/,
                          message:
                            "Invalid first name format. Only alphabets and spaces are allowed.",
                        },
                      })}
                    />
                    {errors.firstName && (
                      <div className="text-red-500 font-semibold mt-2">
                        {errors.firstName.message}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      {...register("lastName", {
                        required: "Last Name  is required",
                        pattern: {
                          value: /^[a-zA-Z\s]+$/,
                          message:
                            "Invalid last name format. Only alphabets and spaces are allowed.",
                        },
                      })}
                      className={`${
                        errors.lastName ? "border-[2px] border-red-500" : ""
                      } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full `}
                    />
                    {errors.lastName && (
                      <div className="text-red-500 font-semibold mt-2">
                        {errors.lastName.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </label>

            <label htmlFor="gender" className="inter">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Gender</h1>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="Male"
                      name="gender"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      className="h-5 w-5 text-blue-500"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="Female"
                      name="gender"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      className="h-5 w-5 text-pink-500"
                    />
                    <span>Female</span>
                  </label>
                </div>
                {errors.gender && (
                  <div className="text-red-500 font-semibold ">
                    {errors.gender.message}
                  </div>
                )}
              </div>
            </label>

            <label htmlFor="email" className="inter  ">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Email Address</h1>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Email Address"
                    name="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address.",
                      },
                    })}
                    className={`${
                      errors.email ? "border-[2px] border-red-500" : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full `}
                  />
                  {errors.email && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.email.message}
                    </div>
                  )}
                </div>
              </div>
            </label>

            <label htmlFor="birthday" className="inter  ">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Date of Birth</h1>
                <div className="w-full">
                  <input
                    type="date"
                    name="birthday"
                    {...register("birthday", {
                      required: "Birthday is required",
                    })}
                    className={`${
                      errors.birthday ? "border-[2px] border-red-500" : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full `}
                  />
                  {errors.birthday && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.birthday.message}
                    </div>
                  )}
                </div>
              </div>
            </label>

            <label htmlFor="address" className="inter  ">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Address</h1>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    className={`${
                      errors.address ? "border-[2px] border-red-500" : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full `}
                  />
                  {errors.address && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.address.message}
                    </div>
                  )}
                </div>
              </div>
            </label>

            <label htmlFor="phoneNumber" className="inter  ">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Phone Number</h1>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="0918391841"
                    name="phoneNumber"
                    {...register("phoneNumber", {
                      required: "Phone Number  is required",
                    })}
                    className={`${
                      errors.phoneNumber ? "border-[2px] border-red-500" : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full `}
                  />
                  {errors.phoneNumber && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.phoneNumber.message}
                    </div>
                  )}
                </div>
              </div>
            </label>

            <label htmlFor="departmentName" className="inter  ">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Department</h1>
                <div className="w-full">
                  <select
                    name="departmentName"
                    {...register("departmentName", {
                      required: "Department Name  is required",
                    })}
                    className={`${
                      errors.departmentName ? "border-[2px] border-red-500" : ""
                    } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full `}
                  >
                    <option value="" hidden>
                      Select Department
                    </option>
                    {departmentNames.map((department, index) => (
                      <option key={index} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                  {errors.departmentName && (
                    <div className="text-red-500 font-semibold mt-2">
                      {errors.departmentName.message}
                    </div>
                  )}
                </div>
              </div>
            </label>

            <label htmlFor="password" className="inter  ">
              <div className="flex flex-col gap-2">
                <div className="flex gap-8">
                  <div className="w-full flex flex-col gap-2">
                    <h1 className="font-semibold">Password</h1>
                    <div>
                      <input
                        type="password"
                        placeholder="Password"
                        className={`${
                          errors.email ? "border-[2px] border-red-500" : ""
                        } h-[60px] border border-[#E2E8F0] outline-[#0C1E33 rounded-md px-4 w-full `}
                        name="password"
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value:
                              /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                            message:
                              "Password must be at least 6 characters with one special character, one digit, and one capital letter.",
                          },
                        })}
                      />
                      {errors.password && (
                        <div className="text-red-500 font-semibold mt-2">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <h1 className="font-semibold">Confirm Password</h1>
                    <div>
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className={`${
                          errors.email ? "border-[2px] border-red-500" : ""
                        } h-[60px] border border-[#E2E8F0] outline-[#0C1E33] rounded-md px-4 w-full `}
                        {...register("confirmPassword", {
                          required: "Confirm Password is required",
                        })}
                        name="confirmPassword"
                      />
                      {errors.confirmPassword && (
                        <div className="text-red-500 font-semibold mt-2">
                          {errors.confirmPassword.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </label>

            <div className="flex flex-col gap-4 ">
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-[#0C1E33] text-white h-[55px] rounded-md mt-2 w-[180px] inter flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <l-dot-pulse
                    size="38"
                    speed="1.3"
                    color="white"
                  ></l-dot-pulse>
                ) : (
                  <div className="flex items-center gap-3">
                    <span>Add Student</span>
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

export default StudentRegistrationForm;
