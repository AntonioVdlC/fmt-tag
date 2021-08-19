/**
 * Factory to create Numeric formatter
 * @param locale
 * @returns
 */
function createNumericFormatter(
  locale: string | undefined
): (str: string, digits: string) => string {
  /**
   * Number formatter
   * @param str
   * @param digits
   * @returns
   */
  return function n(str: string, digits: string): string {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: Number(digits) || 0,
      maximumFractionDigits: Number(digits) || 0,
    }).format(Number(str));
  };
}

export default createNumericFormatter;
