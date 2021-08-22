// TODO: Refactor this file
// TODO: Document user-created formatter in README.md

import createFormatters from "./formatters/create";
import extractFormatOption from "./utils/extract-format-option";

const fmtRegex = /^:([a-zA-Z])(\((.+)\))?/;

// Locale used when formatting template literals;
// defaults to host language settings
let locale: string | undefined;

// Map to keep track of user-created hints and formatters
const userFormatters: Record<
  string,
  (
    locale: string | undefined
  ) => (str: string, option: string | undefined) => string
> = {};

// Map of available formatters
let formatters = {
  ...createUserFormatters(locale),
  ...createFormatters(locale),
};

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
  locale = _locale;

  formatters = {
    ...createUserFormatters(locale),
    ...createFormatters(locale),
  };
};

/**
 * Utility function to generate user-creacted formatters
 * @param locale
 * @returns
 */
function createUserFormatters(
  locale: string | undefined
): Record<string, Function> {
  return Object.keys(userFormatters).reduce(
    (obj: Record<string, Function>, key: string) => {
      obj[key] = userFormatters[key](locale);
      return obj;
    },
    {}
  );
}

/**
 * Registers a new formatter
 * @param tag
 * @param fn
 */
fmt.register = function (
  tag: string,
  fn: (
    locale: string | undefined
  ) => (str: string, option: string | undefined) => string
): void {
  if (tag.length !== 1) {
    throw new Error(
      `User-created hint tags should contain a single character. Received ${tag.length} characters ("${tag}").`
    );
  }

  if (!/[A-Z]/.test(tag)) {
    throw new Error(
      `User-created hint tags should be a capital letter /[A-Z]/. Received "${tag}".`
    );
  }

  if (!(fn instanceof Function)) {
    throw new Error(
      `User-created hint tags should have an accompanying factory function.`
    );
  }

  userFormatters[tag] = fn;

  formatters = {
    ...createUserFormatters(locale),
    ...createFormatters(locale),
  };
};

export default fmt;
