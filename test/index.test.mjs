import { isObject, blank, clone, empty, get, has, paths, rand, sleep } from "../lib";
test("isObject", () => {
  expect(isObject("")).toEqual(false);
  expect(isObject([])).toEqual(true);
  expect(isObject({})).toEqual(true);
  expect(isObject(null)).toEqual(false);
  expect(isObject("   ")).toEqual(false);
  expect(isObject(void 0)).toEqual(false);
});
test("empty", () => {
  expect(empty(0)).toEqual(true);
  expect(empty([])).toEqual(true);
  expect(empty({})).toEqual(true);
  expect(empty(null)).toEqual(true);
  expect(empty("   ")).toEqual(false);
  expect(empty(void 0)).toEqual(true);
});
test("blank", () => {
  expect(blank("")).toEqual(true);
  expect(blank([])).toEqual(true);
  expect(blank({})).toEqual(true);
  expect(blank(null)).toEqual(true);
  expect(blank("   ")).toEqual(true);
  expect(blank(void 0)).toEqual(true);
});
test("sleep", async () => {
  await sleep();
  expect(1).toEqual(2 - 1);
});
test("rand", () => {
  expect(rand(0, 3)).toBeLessThan(4);
});
test("paths", () => {
  const _paths = paths({ a: 1, b: { c: 3 } });
  expect(
    _paths.every((e) => ["a", "b.c"].includes(e))
  ).toEqual(true);
});
test("has", () => {
  expect(
    has({ a: 1, b: { c: 3 } }, "b.c")
  ).toEqual(true);
});
test("get", () => {
  expect(
    get({ a: 1, b: { c: 3 } }, "b.c")
  ).toEqual(3);
});
test("clone", () => {
  const el = { a: 1, b: { c: 3 } };
  const copy = clone(el);
  expect(el === copy).toEqual(false);
  expect(el !== copy).toEqual(true);
  expect(el).toMatchObject(copy);
});
