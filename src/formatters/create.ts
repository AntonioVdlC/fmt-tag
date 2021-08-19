import createCurrencyFormatter from "./currency";
import createDateFormatter from "./date";
import createNumericFormatter from "./numeric";
import createRelativeTimeFormatter from "./relative-time";
import createStringFormatter from "./string";
import createTimeFormatter from "./time";
import createWeekdayFormatter from "./weekday";

/**
 * Returns a map of formatters
 * @param locale
 * @returns
 */
function createFormatters(
  locale: string | undefined
): Record<string, Function> {
  return {
    c: createCurrencyFormatter(locale),
    d: createDateFormatter(locale),
    n: createNumericFormatter(locale),
    r: createRelativeTimeFormatter(locale),
    s: createStringFormatter(locale),
    t: createTimeFormatter(locale),
    w: createWeekdayFormatter(locale),
  };
}

export default createFormatters;
