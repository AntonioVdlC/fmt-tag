// TODO: Add more options to string formatter like uppercase, capitalize, kebab-case, ...
// TODO: Take care of edge cases (e.g. trying to format a string as a number, ...)
// TODO: memoize Intl.NumberFormat() formatters
// TODO: allow for user-created formatters
// TODO: interpolate from left to right to allow for dynamic formatter options?

const fmtRegex = /^:([a-z])(\((.+)\))?/;

const formatters: Record<string, Function> = {
  /**
   * Currency formatter
   * @param str
   * @param currency
   * @returns
   */
  c(str: string, currency: string): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(Number(str));
  },

  /**
   * Date formatter
   * @param str
   * @param format
   * @returns
   */
  d(str: string, format: string): string {
    let dateFormatter;
    switch (format) {
      case "ddd-mmm-YYYY":
        dateFormatter = new Intl.DateTimeFormat(locale, {
          dateStyle: "full",
        });
        break;
      case "DD-mmm-YYYY":
        dateFormatter = new Intl.DateTimeFormat(locale, {
          dateStyle: "long",
        });
        break;
      case "DD-mm-YYYY":
        dateFormatter = new Intl.DateTimeFormat(locale, {
          dateStyle: "medium",
        });
        break;
      case "DD-MM-YYYY":
        dateFormatter = new Intl.DateTimeFormat(locale, {
          dateStyle: "short",
        });
        break;
      default:
        dateFormatter = new Intl.DateTimeFormat();
        break;
    }

    return dateFormatter.format(new Date(str));
  },

  /**
   * Number formatter
   * @param str
   * @param digits
   * @returns
   */
  n(str: string, digits: string): string {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: Number(digits) || 0,
      maximumFractionDigits: Number(digits) || 0,
    }).format(Number(str));
  },

  /**
   * RelativeTime formatter
   * @param str
   */
  r(str: string, unit: Intl.RelativeTimeFormatUnit): string {
    return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
      Number(str),
      unit
    );
  },

  /**
   * String formatter
   * @param str
   * @returns
   */
  s(str: string): string {
    return str != null ? str.toLocaleString() : "";
  },

  /**
   * Time formatter
   * @param str
   * @param format
   */
  t(str: string, format: string): string {
    let timeFormatter;
    switch (format) {
      case "HH:mm:ss TZ+":
        timeFormatter = new Intl.DateTimeFormat(locale, {
          timeStyle: "full",
        });
        break;
      case "HH:mm:ss TZ":
        timeFormatter = new Intl.DateTimeFormat(locale, {
          timeStyle: "long",
        });
        break;
      case "HH:mm:ss aa":
        timeFormatter = new Intl.DateTimeFormat(locale, {
          timeStyle: "medium",
          hour12: true,
        });
        break;
      case "HH:mm:ss":
        timeFormatter = new Intl.DateTimeFormat(locale, {
          timeStyle: "medium",
        });
        break;
      case "HH:mm aa":
        timeFormatter = new Intl.DateTimeFormat(locale, {
          timeStyle: "short",
          hour12: true,
        });
        break;
      case "HH:mm":
      default:
        timeFormatter = new Intl.DateTimeFormat(locale, {
          timeStyle: "short",
        });
        break;
    }

    return timeFormatter.format(new Date(str));
  },

  /**
   * Weekday formatter
   * @param str
   * @param format
   * @returns
   */
  w(str: string, format: string): string {
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
  },
};

/**
 * Extracts the format and option to be used by the formatters
 * @param literal
 * @returns
 */
function extractFormatOption(literal: string): {
  format: string;
  option: string | null;
} {
  let format = "s";
  let option = null;

  const match = fmtRegex.exec(literal);
  if (match) {
    if (Object.keys(formatters).includes(match[1])) {
      format = match[1];
    }

    option = match[3];
  }

  return { format, option };
}

/**
 * Format a template literal
 * @param literals
 * @param substs
 * @returns
 */
function fmt(literals: TemplateStringsArray, ...substs: string[]): string {
  let str = "";
  for (let i = 0, l = literals.length; i < l; i++) {
    str += literals[i].replace(fmtRegex, "");

    const { format, option } = extractFormatOption(
      i + 1 < l ? literals[i + 1] : ""
    );

    str += formatters[format](substs[i], option);
  }
  return str;
}

// Locale used when formatting template literals;
// defaults to host language settings
let locale: string | undefined;

/**
 * Globally sets a new locale value to be used when formatting template
 * literals
 * @param _locale
 */
fmt.use = function (_locale: string): void {
  // TODO: Validate locale?
  locale = _locale;
};

export default fmt;
