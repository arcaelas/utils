"use strict";
var import_lib = require("../lib");
test("isObject", () => {
  expect((0, import_lib.isObject)("")).toEqual(false);
  expect((0, import_lib.isObject)([])).toEqual(true);
  expect((0, import_lib.isObject)({})).toEqual(true);
  expect((0, import_lib.isObject)(null)).toEqual(false);
  expect((0, import_lib.isObject)("   ")).toEqual(false);
  expect((0, import_lib.isObject)(void 0)).toEqual(false);
});
test("empty", () => {
  expect((0, import_lib.empty)(0)).toEqual(true);
  expect((0, import_lib.empty)([])).toEqual(true);
  expect((0, import_lib.empty)({})).toEqual(true);
  expect((0, import_lib.empty)(null)).toEqual(true);
  expect((0, import_lib.empty)("   ")).toEqual(false);
  expect((0, import_lib.empty)(void 0)).toEqual(true);
});
test("blank", () => {
  expect((0, import_lib.blank)("")).toEqual(true);
  expect((0, import_lib.blank)([])).toEqual(true);
  expect((0, import_lib.blank)({})).toEqual(true);
  expect((0, import_lib.blank)(null)).toEqual(true);
  expect((0, import_lib.blank)("   ")).toEqual(true);
  expect((0, import_lib.blank)(void 0)).toEqual(true);
});
test("sleep", async () => {
  await (0, import_lib.sleep)();
  expect(1).toEqual(2 - 1);
});
test("rand", () => {
  expect((0, import_lib.rand)(0, 3)).toBeLessThan(4);
});
test("paths", () => {
  const _paths = (0, import_lib.paths)({ a: 1, b: { c: 3 } });
  expect(
    _paths.every((e) => ["a", "b.c"].includes(e))
  ).toEqual(true);
});
test("has", () => {
  expect(
    (0, import_lib.has)({ a: 1, b: { c: 3 } }, "b.c")
  ).toEqual(true);
});
test("get", () => {
  expect(
    (0, import_lib.get)({ a: 1, b: { c: 3 } }, "b.c")
  ).toEqual(3);
});
test("clone", () => {
  const el = { a: 1, b: { c: 3 } };
  const copy = (0, import_lib.clone)(el);
  expect(el === copy).toEqual(false);
  expect(el !== copy).toEqual(true);
  expect(el).toMatchObject(copy);
});
