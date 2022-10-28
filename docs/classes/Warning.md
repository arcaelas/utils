[@arcaelas/utils](../README.md) / [Exports](../modules.md) / Warning

# Class: Warning<C, M\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `Arcaela.Throwable.Types` |
| `M` | extends `string` |

## Hierarchy

- `Error`

  ↳ **`Warning`**

## Table of contents

### Constructors

- [constructor](Warning.md#constructor)

### Properties

- [code](Warning.md#code)
- [message](Warning.md#message)
- [name](Warning.md#name)
- [stack](Warning.md#stack)

## Constructors

### constructor

• **new Warning**<`C`, `M`\>(`code`, `message?`)

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

[Errors.ts:51](https://github.com/arcaelas/utils/blob/85dff74/Errors.ts#L51)

## Properties

### code

• `Private` **code**: `string` \| `number` = `null`

#### Defined in

[Errors.ts:50](https://github.com/arcaelas/utils/blob/85dff74/Errors.ts#L50)

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
