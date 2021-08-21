// TODO: allow for user-created formatters

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

  // We iterate backwards to allow for dynamic hints (`option`) in formats,
  // for example currency depending on some `country` variable.
  for (let i = substs.length - 1; i >= 0; i--) {
    // We can always look up `i + 1` because there is always one more literal
    // than there are interpolations in a template literal
    str = literals[i + 1] + str;

    const { format, option } = extractFormatOption(
      // Here we need to pass the whole string to date because we need
      // the interpolations that have occured so far in case there are any
      // dynamic hints.
      str,
      fmtRegex,
      Object.keys(formatters)
    );

    // Don't forget to remove the format hints!
    // We do this here after extracting the format hint and option.
    str = formatters[format](substs[i], option) + str.replace(fmtRegex, "");
  }

  // After we are done with all the interpolatinos, prepend the first literal
  str = literals[0] + str;

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
