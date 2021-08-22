import isValidDate from "../utils/is-valid-date";

/**
 * Factory to create Time formatter
 * @param locale
 * @returns
 */
function createTimeFormatter(
  locale: string | undefined
): (str: string, format: string | undefined) => string {
  const memo: Record<string, Intl.DateTimeFormat> = {};

  /**
   * Time formatter
   * @param str
   * @param format
   */
  return function t(str: string, format: string | undefined): string {
    const date = new Date(str);
    const key = String(format);

    if (!isValidDate(date)) {
      return "";
    }

    if (!memo[key]) {
      let options: Intl.DateTimeFormatOptions;
      switch (format) {
        case "HH:mm:ss TZ+":
          options = { timeStyle: "full" };
          break;
        case "HH:mm:ss TZ":
          options = { timeStyle: "long" };
          break;
        case "HH:mm:ss aa":
          options = { timeStyle: "medium", hour12: true };
          break;
        case "HH:mm:ss":
          options = { timeStyle: "medium" };
          break;
        case "HH:mm aa":
          options = { timeStyle: "short", hour12: true };
          break;
        case "HH:mm":
        default:
          options = { timeStyle: "short" };
          break;
      }

      memo[key] = new Intl.DateTimeFormat(locale, options);
    }

    return memo[key].format(date);
  };
}

export default createTimeFormatter;
