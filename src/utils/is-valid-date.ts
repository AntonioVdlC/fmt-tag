/**
 * Checks if a Date is valid
 * Inspired on: https://stackoverflow.com/a/1353711
 * @param date
 * @returns
 */
function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export default isValidDate;
