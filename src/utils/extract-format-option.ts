/**
 * Extracts the format and option to be used by the formatters
 * @param literal
 * @param re
 * @param formatters
 * @returns
 */
function extractFormatOption(
  literal: string,
  re: RegExp,
  formatters: Array<string>
): {
  format: string;
  option: string | null;
} {
  let format = "s";
  let option = null;

  const match = re.exec(literal);
  if (match) {
    if (formatters.includes(match[1])) {
      format = match[1];
    }

    option = match[3];
  }

  return { format, option };
}

export default extractFormatOption;
