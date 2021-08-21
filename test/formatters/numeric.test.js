import fmt from "../../src/index.ts";

describe(":n", () => {
  beforeAll(() => {
    fmt.use("en-UK");
  });

  it("correctly formats number values (with 2 digits)", () => {
    const name = "Alice";
    const number = 42;

    const expected = "Alice has 42.00 oranges!";
    const actual = fmt`${name}:s has ${number}:n(2) oranges!`;

    expect(actual).toEqual(expected);
  });

  it("returns an empty string if value passed cannot be transformed to a Number", () => {
    const number = "some text";

    const expected = "";
    const actual = fmt`${number}:n(2)`;

    expect(actual).toEqual(expected);
  });
});
