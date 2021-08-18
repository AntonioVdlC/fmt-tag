const fmtRegex = /^:([a-z])(\((.+)\))?/;

// TODO: Add more options, such as Dates
// TODO: Allow for user set locale (instead of relying on the host default language)
const formatters: Record<string, Function> = {
  c(str: string, currency: string): string {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(Number(str));
  },
  n(str: string, digits: number): string {
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(Number(str));
  },
  s(str: string): string {
    return str != null ? str.toLocaleString() : "";
  },
};

function extractFormatOption(literal: string) {
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

export default fmt;
