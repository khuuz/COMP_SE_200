import map from "../src/map.js";

describe("map", () => {
  test("maps values with a function", () => {
    const square = (n) => n * n;
    expect(map([4, 8], square)).toEqual([16, 64]);
  });

  test("provides correct arguments to iteratee", () => {
    const iteratee = jest.fn();
    map([1, 2, 3], iteratee);
    expect(iteratee).toHaveBeenNthCalledWith(1, 1, 0, [1, 2, 3]);
    expect(iteratee).toHaveBeenNthCalledWith(2, 2, 1, [1, 2, 3]);
    expect(iteratee).toHaveBeenNthCalledWith(3, 3, 2, [1, 2, 3]);
  });

  test("returns an empty array when input array is empty", () => {
    const square = (n) => n * n;
    expect(map([], square)).toEqual([]);
  });

  test("returns an empty array when input array is null", () => {
    const square = (n) => n * n;
    expect(map(null, square)).toEqual([]);
  });

  test("returns an empty array when input array is undefined", () => {
    const square = (n) => n * n;
    expect(map(undefined, square)).toEqual([]);
  });

  test("maps values with a function that returns objects", () => {
    const toObject = (n) => ({ value: n });
    expect(map([1, 2, 3], toObject)).toEqual([
      { value: 1 },
      { value: 2 },
      { value: 3 },
    ]);
  });

  test("maps values with a function that returns arrays", () => {
    const toArray = (n) => [n, n];
    expect(map([1, 2, 3], toArray)).toEqual([
      [1, 1],
      [2, 2],
      [3, 3],
    ]);
  });

  test("maps values with a function that returns strings", () => {
    const toString = (n) => `value: ${n}`;
    expect(map([1, 2, 3], toString)).toEqual([
      "value: 1",
      "value: 2",
      "value: 3",
    ]);
  });

  test("maps values with a function that returns booleans", () => {
    const isEven = (n) => n % 2 === 0;
    expect(map([1, 2, 3, 4], isEven)).toEqual([false, true, false, true]);
  });

  test("maps values with a function that returns null", () => {
    const toNull = () => null;
    expect(map([1, 2, 3], toNull)).toEqual([null, null, null]);
  });

  test("handles non-array inputs", () => {
    const square = (n) => n * n;
    expect(map({ length: 2, 0: 1, 1: 2 }, square)).toEqual([1, 4]);
  });

  test("handles array-like objects", () => {
    const square = (n) => n * n;
    expect(map({ length: 2, 0: 1, 1: 2 }, square)).toEqual([1, 4]);
  });

  test("handles iteratee that changes the original array", () => {
    const changeOriginal = (n, i, arr) => {
      arr[i] = n * n;
      return n;
    };
    const original = [1, 2, 3];
    expect(map(original, changeOriginal)).toEqual([1, 2, 3]);
    expect(original).toEqual([1, 4, 9]);
  });

  test("handles sparse arrays", () => {
    const square = (n) => n * n;
    const sparse = [1, , 3];
    expect(map(sparse, square)).toEqual([1, NaN, 9]);
  });

  test("throws error when iteratee is not a function", () => {
    expect(() => map([1, 2, 3], null)).toThrow("iteratee is not a function");
  });
});
