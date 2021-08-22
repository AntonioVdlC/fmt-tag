/**
 * Factory to create Numeric formatter
 * @param locale
 * @returns
 */
function createNumericFormatter(
  locale: string | undefined
): (str: string, digits: string | undefined) => string {
  const memo: Record<string, Intl.NumberFormat> = {};

  /**
   * Number formatter
   * @param str
   * @param digits
   * @returns
   */
  return function n(str: string, digits: string | undefined): string {
    const number = Number(str);
    const key = digits ? String(digits) : 0;

    if (isNaN(number)) {
      return "";
    }

    if (!memo[key]) {
      memo[key] = new Intl.NumberFormat(locale, {
        minimumFractionDigits: Number(digits) || 0,
        maximumFractionDigits: Number(digits) || 0,
      });
    }

    return memo[key].format(number);
  };
}

export default createNumericFormatter;
