import fmt from "../../src/index.ts";

describe(":d", () => {
  beforeAll(() => {
    fmt.use("en-UK");
  });

  it("returns the short date by default", () => {
    const name = "Alice";
    const date = new Date("01-01-1970");

    const expected = "Alice was born on 01/01/1970.";
    const actual = fmt`${name} was born on ${date}:d.`;

    // For some reason the default runners on GitHub Actions return
    // the following date format for this particular case ...
    const expectedCI = "Alice was born on 1/1/1970.";

    expect([expected, expectedCI]).toContain(actual);
  });

  it("returns the short date when passed `DD-MM-YYYY`", () => {
    const name = "Alice";
    const date = new Date("01-01-1970");

    const expected = "Alice was born on 01/01/1970.";
    const actual = fmt`${name} was born on ${date}:d(DD-MM-YYYY).`;

    expect(actual).toEqual(expected);
  });

  it("returns the medium date when passed `DD-mm-YYYY`", () => {
    const name = "Alice";
    const date = new Date("01-01-1970");

    const expected = "Alice was born on 1 Jan 1970.";
    const actual = fmt`${name} was born on ${date}:d(DD-mm-YYYY).`;

    expect(actual).toEqual(expected);
  });

  it("returns the long date when passed `DD-mmm-YYYY`", () => {
    const name = "Alice";
    const date = new Date("01-01-1970");

    const expected = "Alice was born on 1 January 1970.";
    const actual = fmt`${name} was born on ${date}:d(DD-mmm-YYYY).`;

    expect(actual).toEqual(expected);
  });

  it("returns the full date when passed `ddd-mmm-YYYY`", () => {
    const name = "Alice";
    const date = new Date("01-01-1970");

    const expected = "Alice was born on Thursday, 1 January 1970.";
    const actual = fmt`${name} was born on ${date}:d(ddd-mmm-YYYY).`;

    expect(actual).toEqual(expected);
  });

  it("returns an empty string if value passed cannot be transformed to a valid Date", () => {
    const date = new Date("some text");

    const expected = "";
    const actual = fmt`${date}:d`;

    expect(actual).toEqual(expected);
  });
});
