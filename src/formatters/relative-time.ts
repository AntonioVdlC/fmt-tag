/**
 * Factory to create RelativeTime formatter
 * @param locale
 * @returns
 */
function createRelativeTimeFormatter(
  locale: string | undefined
): (str: string, unit: Intl.RelativeTimeFormatUnit) => string {
  const memo: Record<string, Intl.RelativeTimeFormat> = {};

  /**
   * RelativeTime formatter
   * @param str
   */
  return function r(str: string, unit: Intl.RelativeTimeFormatUnit): string {
    if (!memo["auto"]) {
      memo["auto"] = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    }

    return memo["auto"].format(Number(str), unit);
  };
}

export default createRelativeTimeFormatter;
