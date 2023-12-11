import reduce from "../src/reduce.js";

describe("reduce", () => {
  test("reduces array with initial accumulator", () => {
    const sum = (acc, n) => acc + n;
    expect(reduce([1, 2], sum, 0)).toBe(3);
  });

  test("reduces array without initial accumulator", () => {
    const sum = (acc, n) => acc + n;
    expect(reduce([1, 2], sum)).toBe(3);
  });

  test("reduces object with initial accumulator", () => {
    const groupByValue = (result, value, key) => {
      (result[value] || (result[value] = [])).push(key);
      return result;
    };
    expect(reduce({ a: 1, b: 2, c: 1 }, groupByValue, {})).toEqual({
      1: ["a", "c"],
      2: ["b"],
    });
  });

  test("reduces object without initial accumulator", () => {
    const groupByValue = (result, value, key) => {
      (result[value] || (result[value] = [])).push(key);
      return result;
    };
    expect(reduce({ a: 1, b: 2, c: 1 }, groupByValue)).toEqual({
      1: ["a", "c"],
      2: ["b"],
    });
  });

  test("provides correct arguments to iteratee", () => {
    const iteratee = jest.fn((acc, value, key, collection) => acc);
    reduce([1, 2, 3], iteratee, 0);
    expect(iteratee).toHaveBeenNthCalledWith(1, 0, 1, 0, [1, 2, 3]);
    expect(iteratee).toHaveBeenNthCalledWith(2, 0, 2, 1, [1, 2, 3]);
    expect(iteratee).toHaveBeenNthCalledWith(3, 0, 3, 2, [1, 2, 3]);
  });

  test("returns initial accumulator when collection is empty", () => {
    const sum = (acc, n) => acc + n;
    expect(reduce([], sum, 0)).toBe(0);
  });

  test("returns undefined when collection and accumulator are empty", () => {
    const sum = (acc, n) => acc + n;
    expect(reduce([], sum)).toBeUndefined();
  });

  test("reduces array-like object with initial accumulator", () => {
    const sum = (acc, n) => acc + n;
    expect(reduce({ 0: 1, 1: 2, length: 2 }, sum, 0)).toBe(3);
  });

  test("reduces array-like object without initial accumulator", () => {
    const sum = (acc, n) => acc + n;
    expect(reduce({ 0: 1, 1: 2, length: 2 }, sum)).toBe(3);
  });

  test("should handle null collection", () => {
    const sum = (acc, n) => acc + n;
    expect(reduce(null, sum, 0)).toBe(0);
  });

  test("should handle undefined collection", () => {
    const sum = (acc, n) => acc + n;
    expect(reduce(undefined, sum, 0)).toBe(0);
  });

  test("should handle non-function iteratee", () => {
    expect(() => reduce([1, 2, 3], "not a function", 0)).toThrow(
      "iteratee is not a function"
    );
  });
  test("should handle undefined iteratee", () => {
    expect(() => reduce([1, 2, 3], undefined, 0)).toThrow(
      "iteratee is not a function"
    );
  });
});
