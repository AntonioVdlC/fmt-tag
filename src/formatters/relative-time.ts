/**
 * Factory to create RelativeTime formatter
 * @param locale
 * @returns
 */
function createRelativeTimeFormatter(
  locale: string | undefined
): (str: string, unit: Intl.RelativeTimeFormatUnit) => string {
  /**
   * RelativeTime formatter
   * @param str
   */
  return function r(str: string, unit: Intl.RelativeTimeFormatUnit): string {
    return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
      Number(str),
      unit
    );
  };
}

export default createRelativeTimeFormatter;
