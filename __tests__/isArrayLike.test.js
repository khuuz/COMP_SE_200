import isArrayLike from "../src/isArrayLike.js";

describe("isArrayLike", () => {
  test("returns true for arrays", () => {
    expect(isArrayLike([1, 2, 3])).toBe(true);
  });

  test("returns true for strings", () => {
    expect(isArrayLike("abc")).toBe(true);
  });

  test("returns false for functions", () => {
    expect(isArrayLike(Function)).toBe(false);
  });

  test("returns false for null", () => {
    expect(isArrayLike(null)).toBe(false);
  });

  test("returns false for undefined", () => {
    expect(isArrayLike(undefined)).toBe(false);
  });

  test("returns true for array-like objects", () => {
    expect(isArrayLike({ length: 3 })).toBe(true);
  });

  test("returns false for objects without length property", () => {
    expect(isArrayLike({})).toBe(false);
  });

  test("returns false for boolean values", () => {
    expect(isArrayLike(true)).toBe(false);
    expect(isArrayLike(false)).toBe(false);
  });

  test("returns false for numbers", () => {
    expect(isArrayLike(123)).toBe(false);
  });

  test("returns false for objects with non-integer length property", () => {
    expect(isArrayLike({ length: "3" })).toBe(false);
    expect(isArrayLike({ length: 3.5 })).toBe(false);
  });
});
