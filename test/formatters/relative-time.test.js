import fmt from "../../src/index.ts";

describe(":r", () => {
  beforeAll(() => {
    fmt.use("en-UK");
  });

  it("returns the relative time correctly", () => {
    const name = "Alice";
    const time = -1;

    const expected = "I had lunch with Alice last week!";
    const actual = fmt`I had lunch with ${name} ${time}:r(weeks)!`;

    expect(actual).toEqual(expected);
  });

  it("returns an empty string if value passed cannot be transformed to a Number", () => {
    const number = "some text";

    const expected = "";
    const actual = fmt`${number}:r(days)`;

    expect(actual).toEqual(expected);
  });
});
