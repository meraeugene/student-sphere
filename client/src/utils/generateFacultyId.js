const currentYear = new Date().getFullYear();

export const generateFacultyID = () => {
  // FACULTY MEMBER - 13 letters
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
  return `${currentYear}13${randomNumber}`;
};
