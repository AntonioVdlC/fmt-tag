/**
 * Factory to create Currency formatter
 * @param locale
 * @returns
 */
function createCurrencyFormatter(
  locale: string | undefined
): (str: string, currency: string) => string {
  const memo: Record<string, Intl.NumberFormat> = {};

  /**
   * Currency formatter
   * @param str
   * @param currency
   * @returns
   */
  return function c(str: string, currency: string): string {
    const number = Number(str);

    if (isNaN(number)) {
      return "";
    }
    if (!currency) {
      return str;
    }

    if (!memo[currency]) {
      memo[currency] = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      });
    }

    return memo[currency].format(number);
  };
}

export default createCurrencyFormatter;
