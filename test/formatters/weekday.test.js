import fmt from "../../src/index.ts";

describe(":w", () => {
  beforeAll(() => {
    fmt.use("en-UK");
  });

  it("returns the full week day of a date by default", () => {
    const name = "Alice";
    const date = new Date("01-01-1970");

    const expected = "Alice was born on a Thursday.";
    const actual = fmt`${name} was born on a ${date}:w.`;

    expect(actual).toEqual(expected);
  });

  it("returns the short week day of a date when passed `WWDD`", () => {
    const name = "Alice";
    const date = new Date("01-01-1970");

    const expected = "Alice was born on a Thursday.";
    const actual = fmt`${name} was born on a ${date}:w(WWDD).`;

    expect(actual).toEqual(expected);
  });

  it("returns the short week day of a date when passed `WD`", () => {
    const name = "Alice";
    const date = new Date("01-01-1970");

    const expected = "Alice was born on a Thu.";
    const actual = fmt`${name} was born on a ${date}:w(WD).`;

    expect(actual).toEqual(expected);
  });

  it("returns an empty string if value passed cannot be transformed to a valid Date", () => {
    const date = new Date("some text");

    const expected = "";
    const actual = fmt`${date}:w`;

    expect(actual).toEqual(expected);
  });
});
