/**
 * Factory to create Date formatter
 * @param locale
 * @returns
 */
function createDateFormatter(
  locale: string | undefined
): (str: string, format: string) => string {
  const memo: Record<string, Intl.DateTimeFormat> = {};

  /**
   * Date formatter
   * @param str
   * @param format
   * @returns
   */
  return function d(str: string, format: string): string {
    if (!memo[format]) {
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

      memo[format] = options
        ? new Intl.DateTimeFormat(locale, options)
        : new Intl.DateTimeFormat();
    }

    return memo[format].format(new Date(str));
  };
}

export default createDateFormatter;
