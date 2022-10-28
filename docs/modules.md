[@arcaelas/utils](README.md) / Exports

# @arcaelas/utils

## Table of contents

### Classes

- [Fatal](classes/Fatal.md)
- [Log](classes/Log.md)
- [Warning](classes/Warning.md)

### Interfaces

- [Promify](interfaces/Promify.md)

### Type Aliases

- [IObject](modules.md#iobject)
- [Noop](modules.md#noop)

### Functions

- [blank](modules.md#blank)
- [clone](modules.md#clone)
- [empty](modules.md#empty)
- [get](modules.md#get)
- [has](modules.md#has)
- [isObject](modules.md#isobject)
- [merge](modules.md#merge)
- [mergeDiff](modules.md#mergediff)
- [paths](modules.md#paths)
- [promify](modules.md#promify)
- [rand](modules.md#rand)
- [set](modules.md#set)
- [setcookie](modules.md#setcookie)
- [sleep](modules.md#sleep)
- [unset](modules.md#unset)
- [unsetcookie](modules.md#unsetcookie)

## Type Aliases

### IObject

Ƭ **IObject**: `Object`

Type for Object

#### Index signature

▪ [K: `string`]: `any`

#### Defined in

[index.ts:10](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L10)

___

### Noop

Ƭ **Noop**: (...`args`: `any`[]) => `any` \| `Promise`<`any`\>

#### Type declaration

▸ (...`args`): `any` \| `Promise`<`any`\>

Compare if Type is any Function Type

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`any` \| `Promise`<`any`\>

#### Defined in

[index.ts:5](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L5)

## Functions

### blank

▸ **blank**(`arr`): `boolean`

**`Description`**

"Blank" is a method to check if a value is never or is empty value.

**`Example`**

```ts
blank('') // true
blank([]) // true
blank({}) // true
blank(null) // true
blank('   ') // true
blank(undefined) // true
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `any` |

#### Returns

`boolean`

#### Defined in

[index.ts:56](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L56)

___

### clone

▸ **clone**<`S`\>(`object`): `S`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `S` |

#### Returns

`S`

#### Defined in

[index.ts:234](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L234)

___

### empty

▸ **empty**<`T`\>(`value`): `boolean`

**`Description`**

Return true if value is not empty.

**`Example`**

```ts
empty(0) // true
empty([]) // true
empty(null) // true
empty(false) // true
empty(undefined) // true

empty([ null ]) // false
empty([ false ]) // false
empty([ undefined ]) // false
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`boolean`

#### Defined in

[index.ts:40](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L40)

___

### get

▸ **get**<`T`, `D`\>(`object`, `path?`, `defaultValue?`): `T` \| `D`

Get any property from an object, using path-key as key.

**`Example`**

```ts
const props = { a: 1, b: 2, c: { d: 3 } }
get(props, 'a') // 1
get(props, 'c.d') // 3
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |
| `D` | `any` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `object` | `object` | `undefined` |
| `path` | `string` | `''` |
| `defaultValue?` | `D` | `undefined` |

#### Returns

`T` \| `D`

#### Defined in

[index.ts:159](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L159)

___

### has

▸ **has**(`object`, `path`): `boolean`

Check if a property is in object, using path-key as key.

**`Example`**

```ts
const props = { a: 1, b: 2, c: { d: 3 } }
has(props, 'a') // true
has(props, 'e') // false
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |
| `path` | `any` |

#### Returns

`boolean`

#### Defined in

[index.ts:143](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L143)

___

### isObject

▸ **isObject**(`fn`): fn is IObject

Use this method to check if a value is an Plain Object

**`Example`**

```ts
isObject({}) // true
isObject([]) // false
isObject(null) // false
isObject(new WebSocket(...)) // false
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `any` |

#### Returns

fn is IObject

#### Defined in

[index.ts:23](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L23)

___

### merge

▸ **merge**(`target`, ...`items`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `...items` | `any`[] |

#### Returns

`any`

#### Defined in

[index.ts:242](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L242)

___

### mergeDiff

▸ **mergeDiff**(`base`, ...`items`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `base` | `any` |
| `...items` | `any`[] |

#### Returns

`any`

#### Defined in

[index.ts:256](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L256)

___

### paths

▸ **paths**<`T`\>(`o`): `string`[]

Get properties of object as path-key format

**`Example`**

```ts
paths({ user:"arcaelas", "age": 25, job:{ home:"dream", school:"student", } })
// ['user','age','job.home', 'job.school']
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`IObject`](modules.md#iobject) = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `T` |

#### Returns

`string`[]

#### Defined in

[index.ts:95](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L95)

___

### promify

▸ **promify**<`S`, `E`\>(): [`Promify`](interfaces/Promify.md)<`S`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | `any` |
| `E` | `any` |

#### Returns

[`Promify`](interfaces/Promify.md)<`S`, `E`\>

#### Defined in

[index.ts:217](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L217)

___

### rand

▸ **rand**(`min?`, `max?`): `number`

**`Description`**

Get random number.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `min` | `number` | `-Infinity` |
| `max` | `number` | `Infinity` |

#### Returns

`number`

#### Defined in

[index.ts:81](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L81)

___

### set

▸ **set**<`T`\>(`target`, `path?`, `value`): `T`

Define any property in object, using path-key as key.

**`Example`**

```ts
const props = { a: 1, b: 2, c: { d: 3 } }
props.a // 1
set(props, 'a', 2)
props.a // 2

props.c.d // 3
set(props, 'c.d', 50)
props.c.d // 50
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `target` | `T` | `undefined` |
| `path` | `string` | `''` |
| `value` | `any` | `undefined` |

#### Returns

`T`

#### Defined in

[index.ts:121](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L121)

___

### setcookie

▸ **setcookie**(`name`, ...`props`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `any` |
| `...props` | [`string`, `number`, ...any[]] |

#### Returns

`string`

#### Defined in

[index.ts:272](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L272)

___

### sleep

▸ **sleep**(`timeout?`): `Promise`<`void`\>

Use this method to supress process by a few time

**`Example`**

```ts
async function submit(form: HTMLFormElement){
 await sleep(3000)
 return form.submit()
}
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `timeout` | `number` | `Infinity` |

#### Returns

`Promise`<`void`\>

#### Defined in

[index.ts:74](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L74)

___

### unset

▸ **unset**<`T`\>(`object`, `path?`): `T`

Remove any property from an object, using path-key as key.

**`Example`**

```ts
const props = { a: 1, b: 2, c: { d: 3 } }
props.a // 1
unset(props, 'a')
props.a // undefined

props.c // { d: 3 }
unset(props, 'c.d')
props.c // undefined
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `object` | `T` | `undefined` |
| `path` | `string` | `''` |

#### Returns

`T`

#### Defined in

[index.ts:182](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L182)

___

### unsetcookie

▸ **unsetcookie**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `any` |

#### Returns

`boolean`

#### Defined in

[index.ts:275](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L275)
