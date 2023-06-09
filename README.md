<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [gitgrep2csv](#gitgrep2csv)
- [Usage](#usage)
- [Interface: Config](#interface-config)
  - [Properties](#properties)
    - [appEnv](#appenv)
    - [appName](#appname)
    - [input](#input)
    - [loadDotEnv](#loaddotenv)
    - [multilineSep](#multilinesep)
    - [process](#process)
- [Interface: GitBlame](#interface-gitblame)
  - [Hierarchy](#hierarchy)
  - [Properties](#properties-1)
    - [author](#author)
    - [authorEmail](#authoremail)
    - [authorTime](#authortime)
    - [authorTz](#authortz)
    - [committer](#committer)
    - [committerEmail](#committeremail)
    - [committerTime](#committertime)
    - [committerTz](#committertz)
    - [lineNum](#linenum)
    - [lineNumNew](#linenumnew)
    - [rev](#rev)
    - [subsequent](#subsequent)
    - [summary](#summary)
- [Interface: GitMerge](#interface-gitmerge)
  - [Hierarchy](#hierarchy-1)
  - [Properties](#properties-2)
    - [author](#author-1)
    - [authorEmail](#authoremail-1)
    - [authorTime](#authortime-1)
    - [authorTz](#authortz-1)
    - [branch](#branch)
    - [committer](#committer-1)
    - [committerEmail](#committeremail-1)
    - [committerTime](#committertime-1)
    - [committerTz](#committertz-1)
    - [lineNum](#linenum-1)
    - [lineNumNew](#linenumnew-1)
    - [parent](#parent)
    - [pr](#pr)
    - [rev](#rev-1)
    - [subsequent](#subsequent-1)
    - [summary](#summary-1)
- [Interface: Match](#interface-match)
  - [Properties](#properties-3)
    - [blame](#blame)
    - [lineEnd](#lineend)
    - [lineStart](#linestart)
    - [matchedPath](#matchedpath)
    - [matches](#matches)
    - [merge](#merge)
    - [path](#path)
    - [pr](#pr-1)
    - [project](#project)
    - [rootDir](#rootdir)
    - [text](#text)
- [API](#api)
  - [Interfaces](#interfaces)
  - [Variables](#variables)
    - [appName](#appname-1)
    - [helper](#helper)
    - [initialDefaults](#initialdefaults)
    - [input](#input-1)
    - [loadDotEnv](#loaddotenv-1)
    - [multilineSep](#multilinesep-1)
  - [Functions](#functions)
    - [argsConfig](#argsconfig)
    - [csv](#csv)
    - [defaults](#defaults)
    - [gitBlame](#gitblame)
    - [gitProject](#gitproject)
    - [githubPr](#githubpr)
    - [lines](#lines)
    - [loadDotEnvOnce](#loaddotenvonce)
    - [multilineGroup](#multilinegroup)
    - [parse](#parse)
    - [processConfig](#processconfig)
    - [reloadDotEnv](#reloaddotenv)
    - [tabsToSpaces](#tabstospaces)
    - [tabsToSpacesTransform](#tabstospacestransform)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="readmemd"></a>

# gitgrep2csv

> Turn grep results into a csv with git information on that file / commit

# Usage

```
$ grep -n foo | gitgrep2csv
```

<a name="interfacesconfigmd"></a>

# Interface: Config

Configuration for a run

## Properties

### appEnv

• `Optional` **appEnv**: `string`

#### Defined in

[types.d.ts:27](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L27)

---

### appName

• **appName**: `string`

#### Defined in

[types.d.ts:26](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L26)

---

### input

• `Optional` **input**: `any`

#### Defined in

[types.d.ts:28](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L28)

---

### loadDotEnv

• `Optional` **loadDotEnv**: `boolean` \| `Function`

#### Defined in

[types.d.ts:29](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L29)

---

### multilineSep

• `Optional` **multilineSep**: `null` \| `string` \| `RegExp`

#### Defined in

[types.d.ts:30](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L30)

---

### process

• `Optional` **process**: `any`

#### Defined in

[types.d.ts:31](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L31)

<a name="interfacesgitblamemd"></a>

# Interface: GitBlame

A single line parsed git blame

## Hierarchy

- **`GitBlame`**

  ↳ [`GitMerge`](#interfacesgitmergemd)

## Properties

### author

• **author**: `string`

#### Defined in

[types.d.ts:42](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L42)

---

### authorEmail

• **authorEmail**: `string`

#### Defined in

[types.d.ts:43](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L43)

---

### authorTime

• **authorTime**: `Date`

#### Defined in

[types.d.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L44)

---

### authorTz

• `Optional` **authorTz**: `number`

#### Defined in

[types.d.ts:45](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L45)

---

### committer

• **committer**: `string`

#### Defined in

[types.d.ts:46](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L46)

---

### committerEmail

• **committerEmail**: `string`

#### Defined in

[types.d.ts:47](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L47)

---

### committerTime

• **committerTime**: `Date`

#### Defined in

[types.d.ts:48](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L48)

---

### committerTz

• `Optional` **committerTz**: `number`

#### Defined in

[types.d.ts:49](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L49)

---

### lineNum

• `Optional` **lineNum**: `number`

#### Defined in

[types.d.ts:39](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L39)

---

### lineNumNew

• `Optional` **lineNumNew**: `number`

#### Defined in

[types.d.ts:40](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L40)

---

### rev

• **rev**: `string`

#### Defined in

[types.d.ts:38](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L38)

---

### subsequent

• `Optional` **subsequent**: `number`

#### Defined in

[types.d.ts:41](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L41)

---

### summary

• **summary**: `string`

#### Defined in

[types.d.ts:50](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L50)

<a name="interfacesgitmergemd"></a>

# Interface: GitMerge

A single line parsed git blame

## Hierarchy

- [`GitBlame`](#interfacesgitblamemd)

  ↳ **`GitMerge`**

## Properties

### author

• **author**: `string`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[author](#author)

#### Defined in

[types.d.ts:42](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L42)

---

### authorEmail

• **authorEmail**: `string`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[authorEmail](#authoremail)

#### Defined in

[types.d.ts:43](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L43)

---

### authorTime

• **authorTime**: `Date`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[authorTime](#authortime)

#### Defined in

[types.d.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L44)

---

### authorTz

• `Optional` **authorTz**: `number`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[authorTz](#authortz)

#### Defined in

[types.d.ts:45](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L45)

---

### branch

• `Optional` **branch**: `string`

#### Defined in

[types.d.ts:56](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L56)

---

### committer

• **committer**: `string`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[committer](#committer)

#### Defined in

[types.d.ts:46](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L46)

---

### committerEmail

• **committerEmail**: `string`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[committerEmail](#committeremail)

#### Defined in

[types.d.ts:47](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L47)

---

### committerTime

• **committerTime**: `Date`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[committerTime](#committertime)

#### Defined in

[types.d.ts:48](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L48)

---

### committerTz

• `Optional` **committerTz**: `number`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[committerTz](#committertz)

#### Defined in

[types.d.ts:49](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L49)

---

### lineNum

• `Optional` **lineNum**: `number`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[lineNum](#linenum)

#### Defined in

[types.d.ts:39](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L39)

---

### lineNumNew

• `Optional` **lineNumNew**: `number`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[lineNumNew](#linenumnew)

#### Defined in

[types.d.ts:40](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L40)

---

### parent

• **parent**: `string`[]

#### Defined in

[types.d.ts:54](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L54)

---

### pr

• `Optional` **pr**: `number`

#### Defined in

[types.d.ts:55](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L55)

---

### rev

• **rev**: `string`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[rev](#rev)

#### Defined in

[types.d.ts:38](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L38)

---

### subsequent

• `Optional` **subsequent**: `number`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[subsequent](#subsequent)

#### Defined in

[types.d.ts:41](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L41)

---

### summary

• **summary**: `string`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[summary](#summary)

#### Defined in

[types.d.ts:50](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L50)

<a name="interfacesmatchmd"></a>

# Interface: Match

A grep match. Listed vaguely in order of display in csv,

## Properties

### blame

• `Optional` **blame**: [`GitBlame`](#interfacesgitblamemd)

#### Defined in

[types.d.ts:13](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L13)

---

### lineEnd

• **lineEnd**: `number`

#### Defined in

[types.d.ts:12](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L12)

---

### lineStart

• **lineStart**: `number`

#### Defined in

[types.d.ts:11](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L11)

---

### matchedPath

• **matchedPath**: `string`

#### Defined in

[types.d.ts:6](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L6)

---

### matches

• `Optional` **matches**: `number`[]

#### Defined in

[types.d.ts:18](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L18)

---

### merge

• `Optional` **merge**: [`GitMerge`](#interfacesgitmergemd)

#### Defined in

[types.d.ts:14](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L14)

---

### path

• **path**: `string`

#### Defined in

[types.d.ts:10](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L10)

---

### pr

• **pr**: `string`

#### Defined in

[types.d.ts:15](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L15)

---

### project

• **project**: `string`

#### Defined in

[types.d.ts:9](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L9)

---

### rootDir

• **rootDir**: `string`

#### Defined in

[types.d.ts:19](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L19)

---

### text

• **text**: `string`

#### Defined in

[types.d.ts:7](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/types.d.ts#L7)

<a name="modulesmd"></a>

# API

## Interfaces

- [Config](#interfacesconfigmd)
- [GitBlame](#interfacesgitblamemd)
- [GitMerge](#interfacesgitmergemd)
- [Match](#interfacesmatchmd)

## Variables

### appName

• **appName**: `string` = `"gitgrep"`

Assign a name, primarily to use for env variable prefix

#### Defined in

[config.ts:17](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/config.ts#L17)

---

### helper

• `Const` **helper**: `Object`

#### Type declaration

| Name      | Type       |
| :-------- | :--------- |
| `streams` | `__module` |

#### Defined in

[index.ts:11](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/index.ts#L11)

---

### initialDefaults

• `Const` **initialDefaults**: `Readonly`<[`Config`](#interfacesconfigmd)\>

For reference, a copy of the startup defaults

#### Defined in

[config.ts:45](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/config.ts#L45)

---

### input

• **input**: `ReadInput` \| `undefined` = `"-"`

Source to read. Defaults to `-` for stdin.

#### Defined in

[config.ts:21](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/config.ts#L21)

---

### loadDotEnv

• **loadDotEnv**: `boolean` \| `Function`

Whether to load dotenv or a function to load it

#### Defined in

[config.ts:25](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/config.ts#L25)

---

### multilineSep

• **multilineSep**: `string` = `""`

Seperator for multi-line code blocks

#### Defined in

[config.ts:29](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/config.ts#L29)

## Functions

### argsConfig

▸ **argsConfig**(`args?`, `base?`): [`Config`](#interfacesconfigmd)

Get config from args & env

#### Parameters

| Name   | Type                                        | Default value |
| :----- | :------------------------------------------ | :------------ |
| `args` | `string`[]                                  | `[]`          |
| `base` | `Partial`<[`Config`](#interfacesconfigmd)\> | `undefined`   |

#### Returns

[`Config`](#interfacesconfigmd)

#### Defined in

[config.ts:74](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/config.ts#L74)

---

### csv

▸ **csv**(`source`): `AsyncIterable`<`string`\>

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `source` | `AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\> |

#### Returns

`AsyncIterable`<`string`\>

#### Defined in

[streams.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/streams.ts#L44)

---

### defaults

▸ **defaults**(`base?`): [`Config`](#interfacesconfigmd)

Populate a Config with defaults.

#### Parameters

| Name    | Type                                        |
| :------ | :------------------------------------------ |
| `base?` | `Partial`<[`Config`](#interfacesconfigmd)\> |

#### Returns

[`Config`](#interfacesconfigmd)

#### Defined in

[config.ts:34](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/config.ts#L34)

---

### gitBlame

▸ **gitBlame**(`source`): `AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\>

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `source` | `AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\> |

#### Returns

`AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\>

#### Defined in

[streams.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/streams.ts#L44)

---

### gitProject

▸ **gitProject**(`source`): `AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\>

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `source` | `AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\> |

#### Returns

`AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\>

#### Defined in

[streams.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/streams.ts#L44)

---

### githubPr

▸ **githubPr**(`source`): `AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\>

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `source` | `AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\> |

#### Returns

`AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\>

#### Defined in

[streams.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/streams.ts#L44)

---

### lines

▸ **lines**(`source`, `split?`): `AsyncGenerator`<`string`, `void`, `unknown`\>

Process an async-iterator of strings, splitting it on newlines

#### Parameters

| Name     | Type                       | Default value |
| :------- | :------------------------- | :------------ |
| `source` | `AsyncIterable`<`string`\> | `undefined`   |
| `split`  | `RegExp`                   | `newlines`    |

#### Returns

`AsyncGenerator`<`string`, `void`, `unknown`\>

#### Defined in

[lines.ts:8](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/lines.ts#L8)

---

### loadDotEnvOnce

▸ **loadDotEnvOnce**(): `void`

Default strategy to load dotenv first time only.

#### Returns

`void`

#### Defined in

[config.ts:65](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/config.ts#L65)

---

### multilineGroup

▸ **multilineGroup**(`c`): <I\>(`source`: `I`) => `I` \| (`lines`: `AsyncIterable`<`string`\>) => `AsyncGenerator`<`string`[], `void`, `unknown`\>

Batch lines together until a config.multilineSep appears
Or pass through if no multilineSep configured

#### Parameters

| Name | Type                            |
| :--- | :------------------------------ |
| `c`  | [`Config`](#interfacesconfigmd) |

#### Returns

<I\>(`source`: `I`) => `I` \| (`lines`: `AsyncIterable`<`string`\>) => `AsyncGenerator`<`string`[], `void`, `unknown`\>

#### Defined in

[group.ts:8](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/group.ts#L8)

---

### parse

▸ **parse**(`c`): (`source`: `AsyncIterable`<`string` \| `string`[]\>) => `AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\>

#### Parameters

| Name | Type                            |
| :--- | :------------------------------ |
| `c`  | [`Config`](#interfacesconfigmd) |

#### Returns

`fn`

▸ (`source`): `AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\>

##### Parameters

| Name     | Type                                     |
| :------- | :--------------------------------------- |
| `source` | `AsyncIterable`<`string` \| `string`[]\> |

##### Returns

`AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\>

#### Defined in

[parse.ts:25](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/parse.ts#L25)

---

### processConfig

▸ **processConfig**(`p?`, `c?`): [`Config`](#interfacesconfigmd)

#### Parameters

| Name | Type                                        | Default value |
| :--- | :------------------------------------------ | :------------ |
| `p`  | `Process`                                   | `process`     |
| `c?` | `Partial`<[`Config`](#interfacesconfigmd)\> | `undefined`   |

#### Returns

[`Config`](#interfacesconfigmd)

#### Defined in

[config.ts:111](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/config.ts#L111)

---

### reloadDotEnv

▸ **reloadDotEnv**(): `void`

Strategy for always reloading dotenv.
Can be useful if config might change & wants freshened.

#### Returns

`void`

#### Defined in

[config.ts:56](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/config.ts#L56)

---

### tabsToSpaces

▸ **tabsToSpaces**(`source`): `AsyncIterable`<`string`\>

#### Parameters

| Name     | Type                       |
| :------- | :------------------------- |
| `source` | `AsyncIterable`<`string`\> |

#### Returns

`AsyncIterable`<`string`\>

#### Defined in

[streams.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/streams.ts#L44)

---

### tabsToSpacesTransform

▸ **tabsToSpacesTransform**(`m`): `string`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `m`  | `string` |

#### Returns

`string`

#### Defined in

[lines.ts:42](https://github.com/pinko-fowle/gitgrep2csv/blob/2341bce/lines.ts#L42)
