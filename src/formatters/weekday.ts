/**
 * Factory to create Time formatter
 * @param locale
 * @returns
 */
function createWeekdayFormatter(
  locale: string | undefined
): (str: string, format: string) => string {
  /**
   * Weekday formatter
   * @param str
   * @param format
   * @returns
   */
  return function w(str: string, format: string): string {
    let weekdayFormatter;
    switch (format) {
      case "WD":
        weekdayFormatter = new Intl.DateTimeFormat(locale, {
          weekday: "short",
        });
        break;

      case "WWDD":
      default:
        weekdayFormatter = new Intl.DateTimeFormat(locale, {
          weekday: "long",
        });
        break;
    }

    return weekdayFormatter.format(new Date(str));
  };
}

export default createWeekdayFormatter;
