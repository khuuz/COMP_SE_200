import countBy from "../src/countBy.js";

describe("countBy", () => {
  test("counts by boolean value", () => {
    const users = [
      { user: "barney", active: true },
      { user: "betty", active: true },
      { user: "fred", active: false },
    ];
    expect(countBy(users, (value) => value.active)).toEqual({
      true: 2,
      false: 1,
    });
  });

  test("counts by string value", () => {
    const users = [
      { user: "barney", active: "yes" },
      { user: "betty", active: "yes" },
      { user: "fred", active: "no" },
    ];
    expect(countBy(users, (value) => value.active)).toEqual({ yes: 2, no: 1 });
  });

  test("counts by number value", () => {
    const numbers = [1, 2, 3, 2, 1];
    expect(countBy(numbers, (value) => value)).toEqual({ 1: 2, 2: 2, 3: 1 });
  });

  test("counts by object property", () => {
    const objects = [{ a: 1 }, { a: 2 }, { a: 1 }];
    expect(countBy(objects, (value) => value.a)).toEqual({ 1: 2, 2: 1 });
  });

  test("counts by complex condition", () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(
      countBy(numbers, (value) => (value % 2 === 0 ? "even" : "odd"))
    ).toEqual({ even: 2, odd: 3 });
  });

  test("counts by identity when no iteratee is provided", () => {
    const numbers = [1, 2, 2, 3, 1];
    expect(countBy(numbers)).toEqual({ 1: 2, 2: 2, 3: 1 });
  });

  test("counts by string length", () => {
    const strings = ["one", "two", "three", "four", "five"];
    expect(countBy(strings, (value) => value.length)).toEqual({
      3: 2,
      4: 2,
      5: 1,
    });
  });

  test("counts by nested object property", () => {
    const objects = [{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 1 } }];
    expect(countBy(objects, (value) => value.a.b)).toEqual({ 1: 2, 2: 1 });
  });

  test("counts by array length", () => {
    const arrays = [[1], [2, 3], [4, 5, 6], [7, 8]];
    expect(countBy(arrays, (value) => value.length)).toEqual({
      1: 1,
      2: 2,
      3: 1,
    });
  });

  test("counts by date year", () => {
    const dates = [
      new Date(2020, 1, 1),
      new Date(2021, 1, 1),
      new Date(2020, 1, 1),
    ];
    expect(countBy(dates, (value) => value.getFullYear())).toEqual({
      2020: 2,
      2021: 1,
    });
  });
});
