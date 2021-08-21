import fmt from "../../src/index.ts";

describe(":s", () => {
  beforeAll(() => {
    fmt.use("en-UK");
  });

  it("correctly formats string values", () => {
    const name = "Alice";
    const number = 42;

    const expected = "Alice has 42 oranges!";
    const actual = fmt`${name}:s has ${number}:s oranges!`;

    expect(actual).toEqual(expected);
  });

  it("defaults to string if formatter not defined", () => {
    const name = "Alice";
    const number = 42;

    const expected = "Alice has 42 oranges!";
    const actual = fmt`${name} has ${number}:z oranges!`;

    expect(actual).toEqual(expected);
  });

  it("returns an uppercase string when passed `U`", () => {
    const name = "Alice";

    const expected = "Hello, ALICE!";
    const actual = fmt`Hello, ${name}:s(U)!`;

    expect(actual).toEqual(expected);
  });

  it("returns an lowercase string when passed `U`", () => {
    const name = "Alice";

    const expected = "Hello, alice!";
    const actual = fmt`Hello, ${name}:s(l)!`;

    expect(actual).toEqual(expected);
  });

  it("returns an empty string if value passed is an empty string", () => {
    const string = "";

    const expected = "";
    const actual = fmt`${string}:s`;

    expect(actual).toEqual(expected);
  });
});
