const currentYear = new Date().getFullYear();

export const generateAdminID = () => {
  // ADMIN - 1
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit random number
  return `${currentYear}1${randomNumber}`;
};

export const generateFacultyID = () => {
  // FACULTY MEMBER - 2
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit random number
  return `${currentYear}2${randomNumber}`;
};

export const generateStudentID = () => {
  // STUDENT - 3
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit random number
  return `${currentYear}3${randomNumber}`;
};
