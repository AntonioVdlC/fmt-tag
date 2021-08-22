import isValidDate from "../utils/is-valid-date";

/**
 * Factory to create Date formatter
 * @param locale
 * @returns
 */
function createDateFormatter(
  locale: string | undefined
): (str: string, format: string | undefined) => string {
  const memo: Record<string, Intl.DateTimeFormat> = {};

  /**
   * Date formatter
   * @param str
   * @param format
   * @returns
   */
  return function d(str: string, format: string | undefined): string {
    const date = new Date(str);
    const key = String(format);

    if (!isValidDate(date)) {
      return "";
    }

    if (!memo[key]) {
      let options: Intl.DateTimeFormatOptions | null;
      switch (format) {
        case "ddd-mmm-YYYY":
          options = { dateStyle: "full" };
          break;
        case "DD-mmm-YYYY":
          options = { dateStyle: "long" };
          break;
        case "DD-mm-YYYY":
          options = { dateStyle: "medium" };
          break;
        case "DD-MM-YYYY":
          options = { dateStyle: "short" };
          break;
        default:
          options = null;
          break;
      }

      memo[key] = options
        ? new Intl.DateTimeFormat(locale, options)
        : new Intl.DateTimeFormat();
    }

    return memo[key].format(date);
  };
}

export default createDateFormatter;
