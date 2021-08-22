/**
 * Factory to create String formatter
 * @param locale
 * @returns
 */
function createStringFormatter(
  locale: string | undefined
): (str: string, format: string | undefined) => string {
  /**
   * String formatter
   * @param str
   * @param format
   * @returns
   */
  return function s(str: string, format: string | undefined): string {
    if (str == null) {
      return "";
    }

    switch (format) {
      case "U":
        return String(str).toLocaleUpperCase(locale);
      case "l":
        return String(str).toLocaleLowerCase(locale);
      default:
        return String(str).toLocaleString();
    }
  };
}

export default createStringFormatter;
