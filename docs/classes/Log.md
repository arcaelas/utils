[@arcaelas/utils](../README.md) / [Exports](../modules.md) / Log

# Class: Log<C, M\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `Arcaela.Throwable.Types` |
| `M` | extends `string` |

## Hierarchy

- `Error`

  ↳ **`Log`**

## Table of contents

### Constructors

- [constructor](Log.md#constructor)

### Properties

- [code](Log.md#code)
- [message](Log.md#message)
- [name](Log.md#name)
- [stack](Log.md#stack)

## Constructors

### constructor

• **new Log**<`C`, `M`\>(`code`, `message?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `Types` |
| `M` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `C` |
| `message?` | `M` |

#### Overrides

Error.constructor

#### Defined in

[Errors.ts:42](https://github.com/arcaelas/utils/blob/85dff74/Errors.ts#L42)

## Properties

### code

• `Private` **code**: `string` \| `number` = `null`

#### Defined in

[Errors.ts:41](https://github.com/arcaelas/utils/blob/85dff74/Errors.ts#L41)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1041

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1040

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1042
