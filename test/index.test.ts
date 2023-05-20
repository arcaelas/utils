import { blank, copy, empty, get, has, keys, rand, sleep } from "../src"


test('empty', () => {
    expect(empty(0)).toEqual(true)
    expect(empty([])).toEqual(true)
    expect(empty({})).toEqual(true)
    expect(empty(null)).toEqual(true)
    expect(empty('   ')).toEqual(false)
    expect(empty(undefined)).toEqual(true)
})

test('blank', () => {
    expect(blank('')).toEqual(true)
    expect(blank([])).toEqual(true)
    expect(blank({})).toEqual(true)
    expect(blank(null)).toEqual(true)
    expect(blank('   ')).toEqual(true)
    expect(blank(undefined)).toEqual(true)
})

test('sleep', async () => {
    await sleep()
    expect(1).toEqual(2 - 1)
})

test('rand', () => {
    expect(rand(0, 3))
        .toBeLessThan(4)
})

test('keys', () => {
    const _paths = keys({ a: 1, b: { c: 3 } }) as string[]
    console.log(_paths)
    expect(
        _paths.every(e => ['a', 'b.c'].includes(e))
    ).toEqual(true)
})

test('has', () => {
    expect(
        has({ a: 1, b: { c: 3 } }, "b.c")
    ).toEqual(true)
})

test('get', () => {
    expect(
        get({ a: 1, b: { c: 3 } }, "b.c")
    ).toEqual(3)
})

test('copy', () => {
    const el = { a: 1, b: { c: 3 } }
    const _copy = copy(el)
    expect(el === _copy).toEqual(false)
    expect(el !== _copy).toEqual(true)
    expect(el).toMatchObject(_copy)
})