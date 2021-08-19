/**
 * Factory to create String formatter
 * @param locale
 * @returns
 */
function createStringFormatter(
  locale: string | undefined
): (str: string, format: string | null) => string {
  /**
   * String formatter
   * @param str
   * @param format
   * @returns
   */
  return function s(str: string, format: string | null): string {
    if (!str) {
      return "";
    }

    switch (format) {
      case "U":
        return str.toLocaleUpperCase(locale);
      case "l":
        return str.toLocaleLowerCase(locale);
      default:
        return str.toLocaleString();
    }
  };
}

export default createStringFormatter;
