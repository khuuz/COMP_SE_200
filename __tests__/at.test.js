// Import the function to test
import at from "../src/at.js";

describe("at", () => {
  const object = {
    a: [{ b: { c: 3 } }, 4],
    d: "test",
    e: { f: { g: "nested" } },
  };

  test("should return values at specified paths", () => {
    expect(at(object, ["a[0].b.c", "a[1]"])).toEqual([3, 4]);
  });

  test("should return undefined for non-existent paths", () => {
    expect(at(object, ["a[2].b.c", "b"])).toEqual([undefined, undefined]);
  });

  test("should handle a single path", () => {
    expect(at(object, "a[1]")).toEqual([4]);
  });

  test("should return value for top-level property", () => {
    expect(at(object, "d")).toEqual(["test"]);
  });

  test("should return value for deeply nested property", () => {
    expect(at(object, "e.f.g")).toEqual(["nested"]);
  });

  test("should return array of undefined for empty paths array", () => {
    expect(at(object, [])).toEqual([]);
  });

  test("should return array with single undefined for single non-existent path", () => {
    expect(at(object, "non.existent.path")).toEqual([undefined]);
  });

  test("should handle multiple paths", () => {
    expect(at(object, ["a[1]", "d", "e.f.g"])).toEqual([4, "test", "nested"]);
  });

  test("should handle array path", () => {
    expect(at(object, ["a[0]"])).toEqual([{ b: { c: 3 } }]);
  });

  test("should handle path to array", () => {
    expect(at(object, "a")).toEqual([[{ b: { c: 3 } }, 4]]);
  });

  test("should handle null object", () => {
    expect(at(null, ["a[0].b.c", "a[1]"])).toEqual([undefined, undefined]);
  });

  test("should handle undefined object", () => {
    expect(at(undefined, ["a[0].b.c", "a[1]"])).toEqual([undefined, undefined]);
  });

  test("should handle non-object", () => {
    expect(at("not an object", ["a[0].b.c", "a[1]"])).toEqual([
      undefined,
      undefined,
    ]);
  });

  test("should handle null path", () => {
    expect(at(object, null)).toEqual([undefined]);
  });

  test("should handle undefined path", () => {
    expect(at(object, undefined)).toEqual([undefined]);
  });

  test("should handle non-string path", () => {
    expect(at(object, 123)).toEqual([undefined]);
  });
});
