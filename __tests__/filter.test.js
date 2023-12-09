import filter from "../src/filter.js";

describe("filter", () => {
  test("filters by truthy value", () => {
    const users = [
      { user: "barney", active: true },
      { user: "fred", active: false },
    ];
    expect(filter(users, ({ active }) => active)).toEqual([
      { user: "barney", active: true },
    ]);
  });

  test("filters by falsy value", () => {
    const users = [
      { user: "barney", active: true },
      { user: "fred", active: false },
    ];
    expect(filter(users, ({ active }) => !active)).toEqual([
      { user: "fred", active: false },
    ]);
  });

  test("filters by number value", () => {
    const numbers = [1, 2, 3, 2, 1];
    expect(filter(numbers, (value) => value === 2)).toEqual([2, 2]);
  });

  test("filters by object property", () => {
    const objects = [{ a: 1 }, { a: 2 }, { a: 1 }];
    expect(filter(objects, (value) => value.a === 1)).toEqual([
      { a: 1 },
      { a: 1 },
    ]);
  });

  test("filters by complex condition", () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(filter(numbers, (value) => value % 2 === 0)).toEqual([2, 4]);
  });

  test("fail when predicate is not provided", () => {
    const values = [1, 2, 3, 4, 5];
    expect(() => filter(values)).toThrow(TypeError);
  });

  test("filters by string length", () => {
    const strings = ["one", "two", "three", "four", "five"];
    expect(filter(strings, (value) => value.length === 3)).toEqual([
      "one",
      "two",
    ]);
  });

  test("filters by nested object property", () => {
    const objects = [{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 1 } }];
    expect(filter(objects, (value) => value.a.b === 1)).toEqual([
      { a: { b: 1 } },
      { a: { b: 1 } },
    ]);
  });

  test("filters by array length", () => {
    const arrays = [[1], [2, 3], [4, 5, 6], [7, 8]];
    expect(filter(arrays, (value) => value.length === 2)).toEqual([
      [2, 3],
      [7, 8],
    ]);
  });

  test("filters by date year", () => {
    const dates = [
      new Date(2020, 1, 1),
      new Date(2021, 1, 1),
      new Date(2020, 1, 1),
    ];
    expect(filter(dates, (value) => value.getFullYear() === 2020)).toEqual([
      new Date(2020, 1, 1),
      new Date(2020, 1, 1),
    ]);
  });
});
