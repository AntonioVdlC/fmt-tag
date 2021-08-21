import fmt from "../src/index.ts";

describe("fmt-tag", () => {
  it("is a function", () => {
    expect(typeof fmt).toBe("function");
  });

  it("has a .use() field which is a function", () => {
    expect(typeof fmt.use).toBe("function");
  });

  it("correctly does string interpolation in template literals", () => {
    const name = "Alice";
    const number = 42;

    const expected = "Alice has 42 oranges!";
    const actual = fmt`${name} has ${number} oranges!`;

    expect(actual).toEqual(expected);
  });

  describe(".use(locale)", () => {
    it("properly set a user inputed locale", () => {
      const name = "Alice";
      const number = 42;
      const price = 20;

      fmt.use("en-UK");

      const expectedENUK = "Alice has 42 oranges worth US$20.00!";
      const actualENUK = fmt`${name}:s has ${number}:n oranges worth ${price}:c(USD)!`;

      expect(actualENUK).toEqual(expectedENUK);

      fmt.use("en-US");

      const expectedENUS = "Alice has 42 oranges worth $20.00!";
      const actualENUS = fmt`${name}:s has ${number}:n oranges worth ${price}:c(USD)!`;

      expect(actualENUS).toEqual(expectedENUS);
    });
  });
});
