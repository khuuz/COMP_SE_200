import difference from "../src/difference.js";

describe("difference", () => {
  test("returns the difference of two arrays", () => {
    expect(difference([2, 1], [2, 3])).toEqual([1]);
  });

  test("returns the difference of three arrays", () => {
    expect(difference([2, 1, 3, 4], [2, 3], [4])).toEqual([1]);
  });

  test("returns the original array when no values are provided", () => {
    expect(difference([2, 1])).toEqual([2, 1]);
  });

  test("returns an empty array when the array is empty", () => {
    expect(difference([], [2, 3])).toEqual([]);
  });

  test("returns an empty array when the array is null", () => {
    expect(difference(null, [2, 3])).toEqual([]);
  });

  test("returns the difference with multiple value arrays", () => {
    expect(difference([2, 1, 3, 4], [2, 3], [1])).toEqual([4]);
  });

  test("returns the difference with array of objects", () => {
    expect(difference([{ x: 1 }], [{ x: 1 }])).toEqual([]);
  });

  test("returns the difference with array of strings", () => {
    expect(difference(["a", "b"], ["a"])).toEqual(["b"]);
  });

  test("returns the difference with array of booleans", () => {
    expect(difference([true, false], [true])).toEqual([false]);
  });

  test("returns the difference with array of mixed types", () => {
    expect(difference([true, "a", 1], [true, "a"])).toEqual([1]);
  });

  test("returns the original array when the values array is empty", () => {
    expect(difference([2, 1], [])).toEqual([2, 1]);
  });

  test("returns the original array when the values array is null", () => {
    expect(difference([2, 1], null)).toEqual([2, 1]);
  });

  test("returns an empty array when both the array and values array are empty", () => {
    expect(difference([], [])).toEqual([]);
  });

  test("returns an empty array when both the array and values array are null", () => {
    expect(difference(null, null)).toEqual([]);
  });

  test("returns the difference when the array contains undefined or null values", () => {
    expect(difference([2, 1, undefined, null], [2, 3])).toEqual([
      1,
      undefined,
      null,
    ]);
  });

  test("returns the difference when the values array contains undefined or null values", () => {
    expect(difference([2, 1], [2, 3, undefined, null])).toEqual([1]);
  });
});
