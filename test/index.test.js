import fmt from "../src/index.ts";

describe("fmt-tag", () => {
  it("is a function", () => {
    expect(typeof fmt).toBe("function");
  });

  it("correctly does string interpolation in template literals", () => {
    const name = "Alice";
    const number = 42;

    const expected = "Alice has 42 oranges!";
    const actual = fmt`${name} has ${number} oranges!`;

    expect(actual).toEqual(expected);
  });

  it("correctly formats string values", () => {
    const name = "Alice";
    const number = 42;

    const expected = "Alice has 42 oranges!";
    const actual = fmt`${name}:s has ${number}:s oranges!`;

    expect(actual).toEqual(expected);
  });

  it("correctly formats number values (with 2 digits)", () => {
    const name = "Alice";
    const number = 42;

    const expected = "Alice has 42.00 oranges!";
    const actual = fmt`${name}:s has ${number}:n(2) oranges!`;

    expect(actual).toEqual(expected);
  });

  it("correctly formats currencies", () => {
    const name = "Alice";
    const number = 42;
    const price = 20;

    const expected = "Alice has 42 oranges worth US$20.00!";
    const actual = fmt`${name}:s has ${number}:n oranges worth ${price}:c(USD)!`;

    expect(actual).toEqual(expected);
  });

  it("defaults to string if formatter not defined", () => {
    const name = "Alice";
    const number = 42;

    const expected = "Alice has 42 oranges!";
    const actual = fmt`${name} has ${number}:t oranges!`;

    expect(actual).toEqual(expected);
  });
});
