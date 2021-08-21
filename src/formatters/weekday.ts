import isValidDate from "../utils/is-valid-date";

/**
 * Factory to create Time formatter
 * @param locale
 * @returns
 */
function createWeekdayFormatter(
  locale: string | undefined
): (str: string, format: string) => string {
  const memo: Record<string, Intl.DateTimeFormat> = {};

  /**
   * Weekday formatter
   * @param str
   * @param format
   * @returns
   */
  return function w(str: string, format: string): string {
    const date = new Date(str);

    if (!isValidDate(date)) {
      return "";
    }

    if (!memo[format]) {
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

      memo[format] = new Intl.DateTimeFormat(locale, options);
    }

    return memo[format].format(date);
  };
}

export default createWeekdayFormatter;
