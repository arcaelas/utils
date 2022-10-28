[@arcaelas/utils](../README.md) / [Exports](../modules.md) / Fatal

# Class: Fatal<C, M\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `Arcaela.Throwable.Types` |
| `M` | extends `string` |

## Hierarchy

- `Error`

  ↳ **`Fatal`**

## Table of contents

### Constructors

- [constructor](Fatal.md#constructor)

### Properties

- [code](Fatal.md#code)
- [message](Fatal.md#message)
- [name](Fatal.md#name)
- [stack](Fatal.md#stack)

## Constructors

### constructor

• **new Fatal**<`C`, `M`\>(`code`, `message?`)

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

[Errors.ts:60](https://github.com/arcaelas/utils/blob/85dff74/Errors.ts#L60)

## Properties

### code

• `Private` **code**: `string` \| `number` = `null`

#### Defined in

[Errors.ts:59](https://github.com/arcaelas/utils/blob/85dff74/Errors.ts#L59)

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
