/**
 * Factory to create Currency formatter
 * @param locale
 * @returns
 */
function createCurrencyFormatter(
  locale: string | undefined
): (str: string, currency: string) => string {
  /**
   * Currency formatter
   * @param str
   * @param currency
   * @returns
   */
  return function c(str: string, currency: string): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(Number(str));
  };
}

export default createCurrencyFormatter;
