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
    expect(iteratee).toHaveBeenNthCalledWith(2, 1, 2, 1, [1, 2, 3]);
    expect(iteratee).toHaveBeenNthCalledWith(3, 3, 3, 2, [1, 2, 3]);
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

  test("throws error when collection is not an array, object, or array-like object", () => {
    const sum = (acc, n) => acc + n;
    expect(() => reduce(123, sum, 0)).toThrow();
  });
});
