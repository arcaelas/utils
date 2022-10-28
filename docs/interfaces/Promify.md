[@arcaelas/utils](../README.md) / [Exports](../modules.md) / Promify

# Interface: Promify<S, E\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `S` | `any` |
| `E` | `any` |

## Hierarchy

- `Promise`<`any`\>

  ↳ **`Promify`**

## Table of contents

### Properties

- [[toStringTag]](Promify.md#[tostringtag])
- [status](Promify.md#status)

### Methods

- [catch](Promify.md#catch)
- [finally](Promify.md#finally)
- [reject](Promify.md#reject)
- [resolve](Promify.md#resolve)
- [then](Promify.md#then)

## Properties

### [toStringTag]

• `Readonly` **[toStringTag]**: `string`

#### Inherited from

Promise.\_\_@toStringTag@22

#### Defined in

node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:174

___

### status

• **status**: ``"failed"`` \| ``"pending"`` \| ``"filled"``

#### Defined in

[index.ts:206](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L206)

## Methods

### catch

▸ **catch**<`TResult`\>(`onrejected?`): `Promise`<`any`\>

Attaches a callback for only the rejection of the Promise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `never` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onrejected?` | (`reason`: `any`) => `TResult` \| `PromiseLike`<`TResult`\> | The callback to execute when the Promise is rejected. |

#### Returns

`Promise`<`any`\>

A Promise for the completion of the callback.

#### Inherited from

Promise.catch

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1527

___

### finally

▸ **finally**(`onfinally?`): `Promise`<`S`\>

Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
resolved value cannot be modified from the callback.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onfinally?` | () => `void` | The callback to execute when the Promise is settled (fulfilled or rejected). |

#### Returns

`Promise`<`S`\>

A Promise for the completion of the callback.

#### Overrides

Promise.finally

#### Defined in

[index.ts:215](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L215)

___

### reject

▸ **reject**<`O`\>(`filled?`): `Promise`<`O`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filled?` | `O` |

#### Returns

`Promise`<`O`\>

#### Defined in

[index.ts:208](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L208)

___

### resolve

▸ **resolve**<`O`\>(`filled?`): `Promise`<`O`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filled?` | `O` |

#### Returns

`Promise`<`O`\>

#### Defined in

[index.ts:207](https://github.com/arcaelas/utils/blob/85dff74/index.ts#L207)

___

### then

▸ **then**<`TResult1`, `TResult2`\>(`onfulfilled?`, `onrejected?`): `Promise`<`TResult1` \| `TResult2`\>

Attaches callbacks for the resolution and/or rejection of the Promise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult1` | `any` |
| `TResult2` | `never` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onfulfilled?` | (`value`: `any`) => `TResult1` \| `PromiseLike`<`TResult1`\> | The callback to execute when the Promise is resolved. |
| `onrejected?` | (`reason`: `any`) => `TResult2` \| `PromiseLike`<`TResult2`\> | The callback to execute when the Promise is rejected. |

#### Returns

`Promise`<`TResult1` \| `TResult2`\>

A Promise for the completion of which ever callback is executed.

#### Inherited from

Promise.then

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1520
