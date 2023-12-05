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
});
