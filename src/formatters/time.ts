/**
 * Factory to create Time formatter
 * @param locale
 * @returns
 */
function createTimeFormatter(
  locale: string | undefined
): (str: string, format: string) => string {
  /**
   * Time formatter
   * @param str
   * @param format
   */
  return function t(str: string, format: string): string {
    let timeFormatter;
    switch (format) {
      case "HH:mm:ss TZ+":
        timeFormatter = new Intl.DateTimeFormat(locale, {
          timeStyle: "full",
        });
        break;
      case "HH:mm:ss TZ":
        timeFormatter = new Intl.DateTimeFormat(locale, {
          timeStyle: "long",
        });
        break;
      case "HH:mm:ss aa":
        timeFormatter = new Intl.DateTimeFormat(locale, {
          timeStyle: "medium",
          hour12: true,
        });
        break;
      case "HH:mm:ss":
        timeFormatter = new Intl.DateTimeFormat(locale, {
          timeStyle: "medium",
        });
        break;
      case "HH:mm aa":
        timeFormatter = new Intl.DateTimeFormat(locale, {
          timeStyle: "short",
          hour12: true,
        });
        break;
      case "HH:mm":
      default:
        timeFormatter = new Intl.DateTimeFormat(locale, {
          timeStyle: "short",
        });
        break;
    }

    return timeFormatter.format(new Date(str));
  };
}

export default createTimeFormatter;
