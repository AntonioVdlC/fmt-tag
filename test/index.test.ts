import { beforeAll, describe, it, expect } from "vitest";

import fmt from "../src";

describe("fmt-tag", () => {
  it("is a function", () => {
    expect(typeof fmt).toBe("function");
  });

  it("has a .use() field which is a function", () => {
    expect(typeof fmt.use).toBe("function");
  });

  it("has a .register() field which is a function", () => {
    expect(typeof fmt.register).toBe("function");
  });

  it("correctly does string interpolation in template literals", () => {
    const name = "Alice";
    const number = 42;

    const expected = "Alice has 42 oranges!";
    const actual = fmt`${name} has ${number} oranges!`;

    expect(actual).toEqual(expected);
  });

  describe(".use()", () => {
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

  describe(".register()", () => {
    it("throws when passed a tag of length !== 1", () => {
      // @ts-expect-error
      expect(() => fmt.register("text", () => {})).toThrow();
    });
    it("throws when passed a tag that is not in /[A-Z]/", () => {
      // @ts-expect-error
      expect(() => fmt.register("a", () => {})).toThrow();
    });
    it("throws when not passed a function as second argument", () => {
      // @ts-expect-error
      expect(() => fmt.register("A", 42)).toThrow();
    });
    it("throws when not passed a high-order function as second argument", () => {
      // @ts-expect-error
      expect(() => fmt.register("A", () => {})).toThrow();
    });

    it("registers a user-defined formatter", () => {
      const tag = "Z";
      const fn = function (locale?: string) {
        return function (str: string, option?: string): string {
          return fmt`${str} (in ${locale}) ZZZZ ${option}:n(2)`;
        };
      };

      fmt.register(tag, fn);

      const name = "Alice";

      const expected = "Hello, Alice (in en-US) ZZZZ 3.00!";
      const actual = fmt`Hello, ${name}:Z(3)!`;

      expect(actual).toEqual(expected);
    });
  });
});

describe("formatters", () => {
  beforeAll(() => {
    fmt.use("en-UK");
  });

  describe(":c", () => {
    it("correctly formats currencies", () => {
      const name = "Alice";
      const price = 20;

      const expected = "Now Alice has oranges worth US$20.00!";
      const actual = fmt`Now ${name}:s has oranges worth ${price}:c(USD)!`;

      expect(actual).toEqual(expected);
    });

    it("correctly formats currencies (dynamic option)", () => {
      const name = "Alice";
      const price = 20;
      const currencyGBP = "GBP";
      const currencyUSD = "USD";

      let country;

      country = "UK";
      const expectedGBP = "Now Alice has oranges worth £20.00!";
      const actualGBP = fmt`Now ${name}:s has oranges worth ${price}:c(${
        country === "UK" ? currencyGBP : currencyUSD
      })!`;

      expect(actualGBP).toEqual(expectedGBP);

      country = "US";
      const expectedUSD = "Now Alice has oranges worth US$20.00!";
      const actualUSD = fmt`Now ${name}:s has oranges worth ${price}:c(${
        country === "UK" ? currencyGBP : currencyUSD
      })!`;

      expect(actualUSD).toEqual(expectedUSD);
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

  describe(":d", () => {
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

  describe(":n", () => {
    it("correctly formats number values (integer - round down)", () => {
      const name = "Alice";
      const number = 42.42;

      const expected = "Alice has 42 oranges!";
      const actual = fmt`${name}:s has ${number}:n oranges!`;

      expect(actual).toEqual(expected);
    });

    it("correctly formats number values (integer - round up)", () => {
      const name = "Alice";
      const number = 42.52;

      const expected = "Alice has 43 oranges!";
      const actual = fmt`${name}:s has ${number}:n oranges!`;

      expect(actual).toEqual(expected);
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

  describe(":r", () => {
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

  describe(":s", () => {
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

    it("returns an lowercase string when passed `l`", () => {
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

    it("returns an empty string if value passed is null", () => {
      const string = null;

      const expected = "";
      const actual = fmt`${string}:s`;

      expect(actual).toEqual(expected);
    });
  });

  describe(":t", () => {
    it("returns hours and minutes of a date by default", () => {
      const name = "Alice";
      const date = new Date(1234567890);

      const expected = "Alice is joining the meeting at 06:56.";
      const actual = fmt`${name} is joining the meeting at ${date}:t.`;

      expect(actual).toEqual(expected);
    });

    it("returns hours and minutes of a date when passed `HH:mm`", () => {
      const name = "Alice";
      const date = new Date(1234567890);

      const expected = "Alice is joining the meeting at 06:56.";
      const actual = fmt`${name} is joining the meeting at ${date}:t(HH:mm).`;

      expect(actual).toEqual(expected);
    });

    it("returns hours and minutes of a date when passed `HH:mm aa`", () => {
      const name = "Alice";
      const date = new Date(1234567890);

      const expected = "Alice is joining the meeting at 06:56 am.";
      const actual = fmt`${name} is joining the meeting at ${date}:t(HH:mm aa).`;

      expect(actual).toEqual(expected);
    });

    it("returns hours, minutes, and seconds of a date when passed `HH:mm:ss`", () => {
      const name = "Alice";
      const date = new Date(1234567890);

      const expected = "Alice is joining the meeting at 06:56:07.";
      const actual = fmt`${name} is joining the meeting at ${date}:t(HH:mm:ss).`;

      expect(actual).toEqual(expected);
    });

    it("returns hours, minutes, and seconds of a date when passed `HH:mm:ss aa`", () => {
      const name = "Alice";
      const date = new Date(1234567890);

      const expected = "Alice is joining the meeting at 06:56:07 am.";
      const actual = fmt`${name} is joining the meeting at ${date}:t(HH:mm:ss aa).`;

      expect(actual).toEqual(expected);
    });

    it("returns the long time form of a date when passed `HH:mm:ss TZ`", () => {
      const name = "Alice";
      const date = new Date(1234567890);

      const expected = "Alice is joining the meeting at 06:56:07 UTC.";
      const actual = fmt`${name} is joining the meeting at ${date}:t(HH:mm:ss TZ).`;

      expect(actual).toEqual(expected);
    });

    it("returns the full time form of a date when passed `HH:mm:ss TZ+`", () => {
      const name = "Alice";
      const date = new Date(1234567890);

      const expected =
        "Alice is joining the meeting at 06:56:07 Coordinated Universal Time.";
      const actual = fmt`${name} is joining the meeting at ${date}:t(HH:mm:ss TZ+).`;

      expect(actual).toEqual(expected);
    });

    it("returns an empty string if value passed cannot be transformed to a valid Date", () => {
      const date = new Date("some text");

      const expected = "";
      const actual = fmt`${date}:t(HH:mm)`;

      expect(actual).toEqual(expected);
    });
  });

  describe(":w", () => {
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
});
