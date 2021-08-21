import fmt from "../../src/index.ts";

describe(":t", () => {
  beforeAll(() => {
    fmt.use("en-UK");
  });

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
