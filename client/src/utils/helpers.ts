/** @format */

// Helper function to get the date one year ago
export const getLastYearDate = () => {
  const now = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(now.getFullYear() - 1);
  return lastYear;
};
