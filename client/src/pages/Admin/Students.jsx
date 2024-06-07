import { useEffect, useState } from "react";
import StudentRegistrationForm from "../../components/Student/StudentRegistrationForm";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStudent,
  fetchStudents,
} from "../../features/students/studentsSlice";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import EditStudentForm from "../../components/Student/EditStudentForm";
import DeleteModal from "../../components/DeleteModal";
import StudentDetailsModal from "@/components/StudentDetailsModal";

const Students = () => {
  const [addStudent, setAddStudent] = useState(false);
  const [editStudent, setEditStudent] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState({});

  const dispatch = useDispatch();
  const studentsData = useSelector((state) => state.students.students);
  const { departmentNames } = useSelector((state) => state.departments);
  const { programs } = useSelector((state) => state.programs);

  const [filters, setFilters] = useState({
    department: "",
    program: "",
  });
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");

  // State for delete confirmation modal
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // State for profile details modal
  const [showProfileDetailsModal, setShowProfileDetailsModal] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);

  const deleteStudentHandler = async (studentId) => {
    try {
      await dispatch(deleteStudent(studentId)).unwrap();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showDeleteConfirmationModal = (id) => {
    setStudentIdToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const hideDeleteConfirmationModal = () => {
    setShowDeleteConfirmation(false);
  };

  const toggleAddStudentState = () => {
    setAddStudent(!addStudent);
  };

  const handleStudentAdded = () => {
    dispatch(fetchStudents());
  };

  const toggleEditStudentState = (studentData) => {
    setStudentToEdit(studentData);
    setEditStudent(!editStudent);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    if (name === "department") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        program: "", // Clear the program filter when department changes
      }));

      const selectedDepartment = departmentNames.find(
        (department) => department.department_name === value
      );

      if (selectedDepartment) {
        const filtered = programs.filter(
          (program) =>
            program.department_id === selectedDepartment.department_id
        );
        setFilteredPrograms(filtered);
      } else {
        setFilteredPrograms([]);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const filteredStudents = studentsData.filter((student) => {
    return (
      (filters.department
        ? student.department_name === filters.department
        : true) &&
      (filters.program ? student.program_name === filters.program : true)
    );
  });

  const searchedStudents = filteredStudents.filter((student) =>
    `${student.first_name} ${student.last_name}`
      .toLowerCase()
      .includes(studentSearchQuery.toLowerCase())
  );

  const showProfileDetailsModalHandler = (studentData) => {
    setStudentDetails(studentData);
    setShowProfileDetailsModal(true);
  };

  const closeProfileDetailsModal = () => {
    setShowProfileDetailsModal(false);
  };

  return (
    <div className="w-full ml-[320px] px-8 overflow-auto">
      <div className="flex items-center justify-between my-10">
        <div className="flex items-center gap-3">
          <FaUsers fontSize={20} />
          <h1 className="text-2xl poppins-medium uppercase">
            STUDENTS MANAGEMENT
          </h1>
        </div>

        <button
          onClick={toggleAddStudentState}
          className="bg-[#164e8e] text-white h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3 hover:bg-[#133e6e] transition-colors duration-300"
        >
          Add Student
          <img src="/images/add.svg" alt="add user" />
        </button>
      </div>

      <div className="flex justify-between mt-10">
        <div className="search__container relative">
          <input
            type="search"
            placeholder="Search student name..."
            value={studentSearchQuery}
            onChange={(e) => setStudentSearchQuery(e.target.value)}
            className="border pl-9 pr-4 bg-[#F5F6F8] text-[#495D72] outline-none w-[250px] h-[40px] rounded-md font-medium"
          />
          <div className="absolute top-1/2 left-[10px] transform -translate-y-1/2">
            <img src="/images/search.png" alt="search" />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            className="border rounded-md p-2 shadow-sm hover:shadow-lg cursor-pointer outline-none transition-all duration-300 ease-in-out"
          >
            <option value="">All Departments</option>
            {departmentNames.map((department, index) => (
              <option key={index} value={department.department_name}>
                {department.department_name}
              </option>
            ))}
          </select>
          <select
            name="program"
            value={filters.program}
            onChange={handleFilterChange}
            className="border rounded-md p-2 shadow-sm hover:shadow-lg cursor-pointer outline-none transition-all duration-300 ease-in-out"
          >
            <option value="">All Programs</option>
            {filteredPrograms.map((program, index) => (
              <option key={index} value={program.program_name}>
                {program.program_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {searchedStudents.length > 0 ? (
        <div className="students-table__container my-10">
          <div className="mb-8 overflow-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="whitespace-nowrap shadow-sm border shadow-blue-200">
                  <th className="px-4 py-2 text-left font-bold">#</th>
                  <th className="px-4 py-2 text-left font-bold">STUDENT ID</th>
                  <th className="px-4 py-2 text-left font-bold">FIRST NAME</th>
                  <th className="px-4 py-2 text-left font-bold">LAST NAME</th>
                  <th className="px-4 py-2 text-left font-bold">EMAIL</th>
                  <th className="px-4 py-2 text-left font-bold">
                    PHONE NUMBER
                  </th>
                  <th className="px-4 py-2 text-left font-bold">GENDER</th>
                  <th className="px-4 py-2 text-left font-bold">
                    ENROLLMENT STATUS
                  </th>
                  <th className="px-4 py-2 text-left font-bold">DEPARTMENT</th>
                  <th className="px-4 py-2 text-left font-bold">PROGRAM</th>
                  <th className="px-4 py-2 text-left font-bold">YEAR LEVEL</th>
                  <th className="px-4 py-2 text-left font-bold">SEMESTER</th>
                  <th className="px-4 py-2 text-left font-bold">SECTION</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {searchedStudents.map((student, index) => {
                  return (
                    <tr
                      key={index}
                      className="whitespace-nowrap border hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{student.username}</td>
                      <td className="px-4 py-2">
                        {capitalizeFirstLetter(student.first_name)}
                      </td>
                      <td className="px-4 py-2">
                        {capitalizeFirstLetter(student.last_name)}
                      </td>
                      <td className="px-4 py-2">{student.email}</td>
                      <td className="px-4 py-2">{student.phone_number}</td>
                      <td className="px-4 py-2">{student.gender}</td>
                      <td className="px-4 py-2">
                        <span
                          className={
                            student.enrollment_status === "Enrolled"
                              ? "bg-green-200 h-[35px] rounded-md text-green-700 flex items-center justify-center"
                              : "bg-red-200 h-[35px] text-red-700 rounded-md flex items-center justify-center"
                          }
                        >
                          {student.enrollment_status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {student.department_name
                          ? student.department_name
                          : "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {student.program_name ? student.program_name : "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {student.year_level ? student.year_level : "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {student.semester ? student.semester : "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {student.section_name ? student.section_name : "N/A"}
                      </td>
                      <td className="flex h-full items-center gap-2 px-4 py-2">
                        <button
                          onClick={() =>
                            showProfileDetailsModalHandler(student)
                          }
                          className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200 text-sm"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => toggleEditStudentState(student)}
                          className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200"
                        >
                          <FaRegEdit color="green" />
                        </button>
                        <button
                          className="btn-sm rounded border border-gray-400 h-[35px] px-2 hover:bg-gray-200"
                          onClick={() =>
                            showDeleteConfirmationModal(student.student_id)
                          }
                        >
                          <FaTrash color="red" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-lg text-gray-500 rounded-md poppins-regular mt-8  py-2 px-4 border">
          No students found. Please try again.
        </div>
      )}

      {showProfileDetailsModal && studentDetails && (
        <StudentDetailsModal
          data={studentDetails}
          close={closeProfileDetailsModal}
        />
      )}

      {showDeleteConfirmation && studentIdToDelete && (
        <DeleteModal
          onCancel={hideDeleteConfirmationModal}
          onDelete={() => {
            deleteStudentHandler(studentIdToDelete);
            hideDeleteConfirmationModal();
          }}
        />
      )}

      {addStudent && (
        <StudentRegistrationForm
          toggleAddStudentState={toggleAddStudentState}
          onStudentAdded={handleStudentAdded}
        />
      )}

      {editStudent && (
        <EditStudentForm
          student={studentToEdit}
          toggleEditStudentState={toggleEditStudentState}
          onStudentAdded={handleStudentAdded}
        />
      )}
    </div>
  );
};

export default Students;
