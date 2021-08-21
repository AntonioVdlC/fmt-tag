/**
 * Factory to create Numeric formatter
 * @param locale
 * @returns
 */
function createNumericFormatter(
  locale: string | undefined
): (str: string, digits: string) => string {
  const memo: Record<string, Intl.NumberFormat> = {};

  /**
   * Number formatter
   * @param str
   * @param digits
   * @returns
   */
  return function n(str: string, digits: string): string {
    const number = Number(str);

    if (!str || isNaN(number)) {
      return "";
    }

    if (!memo[digits]) {
      memo[digits] = new Intl.NumberFormat(locale, {
        minimumFractionDigits: Number(digits) || 0,
        maximumFractionDigits: Number(digits) || 0,
      });
    }

    return memo[digits].format(number);
  };
}

export default createNumericFormatter;
