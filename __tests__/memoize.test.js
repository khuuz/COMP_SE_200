import memoize from "../src/memoize.js";

describe("memoize", () => {
  beforeEach(() => {
    memoize.Cache = Map;
  });
  test("memoizes function results", () => {
    const square = jest.fn((n) => n * n);
    const memoizedSquare = memoize(square);
    expect(memoizedSquare(4)).toBe(16);
    expect(memoizedSquare(4)).toBe(16);
    expect(square).toHaveBeenCalledTimes(1);
  });

  test("uses resolver to determine cache key", () => {
    const add = jest.fn((a, b) => a + b);
    const memoizedAdd = memoize(add, (a, b) => `${a},${b}`);
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(add).toHaveBeenCalledTimes(1);
  });

  test("uses first argument as cache key by default", () => {
    const identity = jest.fn((n) => n);
    const memoizedIdentity = memoize(identity);
    expect(memoizedIdentity(1)).toBe(1);
    expect(memoizedIdentity(1)).toBe(1);
    expect(identity).toHaveBeenCalledTimes(1);
  });

  test("exposes cache on memoized function", () => {
    const square = (n) => n * n;
    const memoizedSquare = memoize(square);
    expect(memoizedSquare.cache).toBeInstanceOf(Map);
  });

  test("allows modifying cache", () => {
    const square = (n) => n * n;
    const memoizedSquare = memoize(square);
    memoizedSquare(4);
    memoizedSquare.cache.set(4, 100);
    expect(memoizedSquare(4)).toBe(100);
  });

  test("allows replacing cache constructor", () => {
    const square = (n) => n * n;
    memoize.Cache = WeakMap;
    const memoizedSquare = memoize(square, (n) => ({n}));
    expect(memoizedSquare.cache).toBeInstanceOf(WeakMap);
  });

  test("throws error when func is not a function", () => {
    expect(() => memoize(null)).toThrow("Expected a function");
  });

  test("throws error when function and resolver are not functions", () => {
    expect(() => memoize(null, null)).toThrow("Expected a function");
  });

  test("handles multiple arguments", () => {
    const add = jest.fn((a, b) => a + b);
    const memoizedAdd = memoize(add);
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(add).toHaveBeenCalledTimes(1);
  });

  test("handles different arguments with same first value", () => {
    const add = jest.fn((a, b) => a + b);
    const memoizedAdd = memoize(add);
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(memoizedAdd(3, 1)).toBe(4);
    expect(add).toHaveBeenCalledTimes(2);
  });
});
