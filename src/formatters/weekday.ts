import isValidDate from "../utils/is-valid-date";

/**
 * Factory to create Time formatter
 * @param locale
 * @returns
 */
function createWeekdayFormatter(
  locale: string | undefined
): (str: string, format: string | undefined) => string {
  const memo: Record<string, Intl.DateTimeFormat> = {};

  /**
   * Weekday formatter
   * @param str
   * @param format
   * @returns
   */
  return function w(str: string, format: string | undefined): string {
    const date = new Date(str);
    const key = String(format);

    if (!isValidDate(date)) {
      return "";
    }

    if (!memo[key]) {
      let options: Intl.DateTimeFormatOptions;
      switch (format) {
        case "WD":
          options = { weekday: "short" };
          break;
        case "WWDD":
        default:
          options = { weekday: "long" };
          break;
      }

      memo[key] = new Intl.DateTimeFormat(locale, options);
    }

    return memo[key].format(date);
  };
}

export default createWeekdayFormatter;
