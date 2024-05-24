const currentYear = new Date().getFullYear();

export const generateStudentID = () => {
  // STUDENT - 7 letters
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit random number
  return `${currentYear}7${randomNumber}`;
};
