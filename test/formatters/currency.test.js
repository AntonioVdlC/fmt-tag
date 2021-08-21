import fmt from "../../src/index.ts";

describe(":c", () => {
  beforeAll(() => {
    fmt.use("en-UK");
  });

  it("correctly formats currencies", () => {
    const name = "Alice";
    const price = 20;

    const expected = "Alice has oranges worth US$20.00!";
    const actual = fmt`${name}:s has oranges worth ${price}:c(USD)!`;

    expect(actual).toEqual(expected);
  });

  it("returns an empty string if value passed cannot be transformed to a Number", () => {
    const number = "some text";

    const expected = "";
    const actual = fmt`${number}:c(USD)`;

    expect(actual).toEqual(expected);
  });

  it("returns an the interpolation if no currency passed", () => {
    const name = "Alice";
    const price = 20;

    const expected = "Alice has oranges worth 20!";
    const actual = fmt`${name}:s has oranges worth ${price}:c!`;

    expect(actual).toEqual(expected);
  });
});
