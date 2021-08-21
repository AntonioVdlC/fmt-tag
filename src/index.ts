// TODO: Take care of edge cases (e.g. trying to format a string as a number, ...)
// TODO: allow for user-created formatters
// TODO: interpolate from left to right to allow for dynamic formatter options?

import createFormatters from "./formatters/create";
import extractFormatOption from "./utils/extract-format-option";

const fmtRegex = /^:([a-z])(\((.+)\))?/;

// Locale used when formatting template literals;
// defaults to host language settings
let locale: string | undefined;
let formatters = createFormatters(locale);

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
      i + 1 < l ? literals[i + 1] : "",
      fmtRegex,
      Object.keys(formatters)
    );

    str += formatters[format](substs[i], option);
  }
  return str;
}

/**
 * Globally sets a new locale value to be used when formatting template
 * literals
 * @param _locale
 */
fmt.use = function (_locale: string): void {
  // TODO: Validate locale?
  locale = _locale;
  formatters = createFormatters(locale);
};

export default fmt;
