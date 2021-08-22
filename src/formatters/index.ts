import createCurrencyFormatter from "./currency";
import createDateFormatter from "./date";
import createNumericFormatter from "./numeric";
import createRelativeTimeFormatter from "./relative-time";
import createStringFormatter from "./string";
import createTimeFormatter from "./time";
import createWeekdayFormatter from "./weekday";

// Map to keep track of user-created hints and formatters
const userFormatters: Record<
  string,
  (locale?: string) => (str: string, option?: string) => string
> = {};

/**
 * Adds a new entry to the user formatters map
 * @param tag
 * @param fn
 */
function addUserFormatter(
  tag: string,
  fn: (locale?: string) => (str: string, option?: string) => string
): void {
  userFormatters[tag] = fn;
}

/**
 * Returns a map of formatters
 * @param locale
 * @returns
 */
function generateFormatters(
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

    // User-created formatters
    ...Object.keys(userFormatters).reduce(
      (obj: Record<string, Function>, key: string) => {
        obj[key] = userFormatters[key](locale);
        return obj;
      },
      {}
    ),
  };
}

export { addUserFormatter, generateFormatters };
