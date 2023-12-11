import slice from "../src/slice.js";

describe("slice", () => {
  test("slices array from start index", () => {
    expect(slice([1, 2, 3, 4], 2)).toEqual([3, 4]);
  });

  test("slices array from start to end index", () => {
    expect(slice([1, 2, 3, 4], 1, 3)).toEqual([2, 3]);
  });

  test("slices array with negative start index", () => {
    expect(slice([1, 2, 3, 4], -2)).toEqual([3, 4]);
  });

  test("slices array with negative end index", () => {
    expect(slice([1, 2, 3, 4], 1, -1)).toEqual([2, 3]);
  });

  test("returns empty array when start is greater than end", () => {
    expect(slice([1, 2, 3, 4], 3, 2)).toEqual([]);
  });

  test("returns empty array when array is null", () => {
    expect(slice(null, 0, 2)).toEqual([]);
  });

  test("returns empty array when array is undefined", () => {
    expect(slice(undefined, 0, 2)).toEqual([]);
  });

  test("returns whole array when end is greater than array length", () => {
    expect(slice([1, 2, 3, 4], 0, 10)).toEqual([1, 2, 3, 4]);
  });

  test("returns empty array when start is equal to array length", () => {
    expect(slice([1, 2, 3, 4], 4)).toEqual([]);
  });

  test("returns empty array when start is greater than array length", () => {
    expect(slice([1, 2, 3, 4], 5)).toEqual([]);
  });

  test("returns empty array when start is negative and greater than array length in magnitude", () => {
    expect(slice([1, 2, 3, 4], -5)).toEqual([1, 2, 3, 4]);
  });

  test("returns empty array when end is negative and greater than array length in magnitude", () => {
    expect(slice([1, 2, 3, 4], 0, -5)).toEqual([]);
  });

  test("returns whole array when start and end are not provided", () => {
    expect(slice([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  test("returns empty array when array is empty", () => {
    expect(slice([], 0, 2)).toEqual([]);
  });

  test("returns empty array when non-array is provided", () => {
    expect(slice("thisischararray", 0, 2)).toEqual(["t", "h"]);
  });

  test("returns empty array when start is not a number", () => {
    expect(slice([1, 2, 3, 4], "not a number", 2)).toEqual([]);
  });

  test("returns empty array when end is not a number", () => {
    expect(slice([1, 2, 3, 4], 0, "not a number")).toEqual([]);
  });
});
