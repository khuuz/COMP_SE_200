import get from "../src/get.js";

describe("get", () => {
  test("gets value at path", () => {
    const object = { a: [{ b: { c: 3 } }] };
    expect(get(object, "a[0].b.c")).toBe(3);
  });

  test("gets value at path with array", () => {
    const object = { a: [{ b: { c: 3 } }] };
    expect(get(object, ["a", "0", "b", "c"])).toBe(3);
  });

  test("returns default value when path does not exist", () => {
    const object = { a: [{ b: { c: 3 } }] };
    expect(get(object, "a.b.c", "default")).toBe("default");
  });

  test("returns undefined when path does not exist and no default value is provided", () => {
    const object = { a: [{ b: { c: 3 } }] };
    expect(get(object, "a.b.c")).toBeUndefined();
  });

  test("gets value at path with special characters", () => {
    const object = { "a-b": { "c.d": 3 } };
    expect(get(object, 'a-b["c.d"]')).toBe(3);
  });

  test("gets value at path with nested arrays", () => {
    const object = { a: [[{ b: 3 }]] };
    expect(get(object, "a[0][0].b")).toBe(3);
  });

  test("gets value at path with deep nesting", () => {
    const object = { a: { b: { c: { d: { e: 3 } } } } };
    expect(get(object, "a.b.c.d.e")).toBe(3);
  });

  test("returns default value when object is null", () => {
    const object = null;
    expect(get(object, "a.b.c", "default")).toBe("default");
  });

  test("returns default value when object is undefined", () => {
    const object = undefined;
    expect(get(object, "a.b.c", "default")).toBe("default");
  });

  test("returns undefined when object is null and no default value is provided", () => {
    const object = null;
    expect(get(object, "a.b.c")).toBeUndefined();
  });
});
