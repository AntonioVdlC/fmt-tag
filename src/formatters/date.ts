/**
 * Factory to create Date formatter
 * @param locale
 * @returns
 */
function createDateFormatter(
  locale: string | undefined
): (str: string, format: string) => string {
  /**
   * Date formatter
   * @param str
   * @param format
   * @returns
   */
  return function d(str: string, format: string): string {
    let dateFormatter;
    switch (format) {
      case "ddd-mmm-YYYY":
        dateFormatter = new Intl.DateTimeFormat(locale, {
          dateStyle: "full",
        });
        break;
      case "DD-mmm-YYYY":
        dateFormatter = new Intl.DateTimeFormat(locale, {
          dateStyle: "long",
        });
        break;
      case "DD-mm-YYYY":
        dateFormatter = new Intl.DateTimeFormat(locale, {
          dateStyle: "medium",
        });
        break;
      case "DD-MM-YYYY":
        dateFormatter = new Intl.DateTimeFormat(locale, {
          dateStyle: "short",
        });
        break;
      default:
        dateFormatter = new Intl.DateTimeFormat();
        break;
    }

    return dateFormatter.format(new Date(str));
  };
}

export default createDateFormatter;
