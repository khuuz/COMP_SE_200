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
});
