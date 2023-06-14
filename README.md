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
    - [semgrep](#semgrep)
    - [sep](#sep)
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
    - [lines](#lines)
    - [previous](#previous)
    - [rev](#rev)
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
    - [lines](#lines-1)
    - [parent](#parent)
    - [pr](#pr)
    - [previous](#previous-1)
    - [rev](#rev-1)
    - [summary](#summary-1)
- [Interface: Match](#interface-match)
  - [Properties](#properties-3)
    - [commits](#commits)
    - [head](#head)
    - [lineEnd](#lineend)
    - [lineStart](#linestart)
    - [matchedPath](#matchedpath)
    - [matches](#matches)
    - [merges](#merges)
    - [path](#path)
    - [project](#project)
    - [rootDir](#rootdir)
    - [text](#text)
    - [vars](#vars)
- [API](#api)
  - [Interfaces](#interfaces)
  - [Variables](#variables)
    - [appName](#appname-1)
    - [csvHeaderTitles](#csvheadertitles)
    - [helper](#helper)
    - [initialDefaults](#initialdefaults)
    - [input](#input-1)
    - [loadDotEnv](#loaddotenv-1)
    - [multilineSep](#multilinesep-1)
    - [semgrep](#semgrep-1)
    - [sep](#sep-1)
  - [Functions](#functions)
    - [argsConfig](#argsconfig)
    - [csv](#csv)
    - [csvHeaders](#csvheaders)
    - [defaults](#defaults)
    - [gitBlame](#gitblame)
    - [gitHead](#githead)
    - [gitProject](#gitproject)
    - [githubPr](#githubpr)
    - [lines](#lines-2)
    - [loadDotEnvOnce](#loaddotenvonce)
    - [multilineGroup](#multilinegroup)
    - [parse](#parse)
    - [parseSemgrep](#parsesemgrep)
    - [parseSemgrepMatch](#parsesemgrepmatch)
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

[types.d.ts:28](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L28)

---

### appName

• **appName**: `string`

#### Defined in

[types.d.ts:27](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L27)

---

### input

• `Optional` **input**: `any`

#### Defined in

[types.d.ts:29](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L29)

---

### loadDotEnv

• `Optional` **loadDotEnv**: `boolean` \| `Function`

#### Defined in

[types.d.ts:30](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L30)

---

### multilineSep

• `Optional` **multilineSep**: `null` \| `string` \| `RegExp`

#### Defined in

[types.d.ts:31](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L31)

---

### process

• `Optional` **process**: `any`

#### Defined in

[types.d.ts:34](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L34)

---

### semgrep

• **semgrep**: `boolean`

#### Defined in

[types.d.ts:32](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L32)

---

### sep

• **sep**: `string`

#### Defined in

[types.d.ts:33](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L33)

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

[types.d.ts:43](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L43)

---

### authorEmail

• **authorEmail**: `string`

#### Defined in

[types.d.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L44)

---

### authorTime

• **authorTime**: `Date`

#### Defined in

[types.d.ts:45](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L45)

---

### authorTz

• `Optional` **authorTz**: `number`

#### Defined in

[types.d.ts:46](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L46)

---

### committer

• **committer**: `string`

#### Defined in

[types.d.ts:47](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L47)

---

### committerEmail

• **committerEmail**: `string`

#### Defined in

[types.d.ts:48](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L48)

---

### committerTime

• **committerTime**: `Date`

#### Defined in

[types.d.ts:49](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L49)

---

### committerTz

• `Optional` **committerTz**: `number`

#### Defined in

[types.d.ts:50](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L50)

---

### lines

• `Optional` **lines**: `number`[]

#### Defined in

[types.d.ts:53](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L53)

---

### previous

• `Optional` **previous**: `string`

#### Defined in

[types.d.ts:51](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L51)

---

### rev

• **rev**: `string`

#### Defined in

[types.d.ts:41](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L41)

---

### summary

• **summary**: `string`

#### Defined in

[types.d.ts:52](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L52)

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

[types.d.ts:43](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L43)

---

### authorEmail

• **authorEmail**: `string`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[authorEmail](#authoremail)

#### Defined in

[types.d.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L44)

---

### authorTime

• **authorTime**: `Date`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[authorTime](#authortime)

#### Defined in

[types.d.ts:45](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L45)

---

### authorTz

• `Optional` **authorTz**: `number`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[authorTz](#authortz)

#### Defined in

[types.d.ts:46](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L46)

---

### branch

• `Optional` **branch**: `string`

#### Defined in

[types.d.ts:59](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L59)

---

### committer

• **committer**: `string`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[committer](#committer)

#### Defined in

[types.d.ts:47](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L47)

---

### committerEmail

• **committerEmail**: `string`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[committerEmail](#committeremail)

#### Defined in

[types.d.ts:48](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L48)

---

### committerTime

• **committerTime**: `Date`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[committerTime](#committertime)

#### Defined in

[types.d.ts:49](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L49)

---

### committerTz

• `Optional` **committerTz**: `number`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[committerTz](#committertz)

#### Defined in

[types.d.ts:50](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L50)

---

### lines

• `Optional` **lines**: `number`[]

#### Inherited from

[GitBlame](#interfacesgitblamemd).[lines](#lines)

#### Defined in

[types.d.ts:53](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L53)

---

### parent

• **parent**: `string`[]

#### Defined in

[types.d.ts:57](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L57)

---

### pr

• `Optional` **pr**: `number`

#### Defined in

[types.d.ts:58](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L58)

---

### previous

• `Optional` **previous**: `string`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[previous](#previous)

#### Defined in

[types.d.ts:51](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L51)

---

### rev

• **rev**: `string`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[rev](#rev)

#### Defined in

[types.d.ts:41](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L41)

---

### summary

• **summary**: `string`

#### Inherited from

[GitBlame](#interfacesgitblamemd).[summary](#summary)

#### Defined in

[types.d.ts:52](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L52)

<a name="interfacesmatchmd"></a>

# Interface: Match

A grep match. Listed vaguely in order of display in csv,

## Properties

### commits

• `Optional` **commits**: `Record`<`string`, [`GitBlame`](#interfacesgitblamemd)\>

#### Defined in

[types.d.ts:13](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L13)

---

### head

• **head**: `string`

#### Defined in

[types.d.ts:16](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L16)

---

### lineEnd

• **lineEnd**: `number`

#### Defined in

[types.d.ts:12](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L12)

---

### lineStart

• **lineStart**: `number`

#### Defined in

[types.d.ts:11](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L11)

---

### matchedPath

• **matchedPath**: `string`

#### Defined in

[types.d.ts:6](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L6)

---

### matches

• `Optional` **matches**: `number`[]

#### Defined in

[types.d.ts:19](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L19)

---

### merges

• `Optional` **merges**: `Record`<`string`, [`GitMerge`](#interfacesgitmergemd)\>

#### Defined in

[types.d.ts:14](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L14)

---

### path

• **path**: `string`

#### Defined in

[types.d.ts:10](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L10)

---

### project

• **project**: `string`

#### Defined in

[types.d.ts:9](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L9)

---

### rootDir

• **rootDir**: `string`

#### Defined in

[types.d.ts:20](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L20)

---

### text

• **text**: `string`

#### Defined in

[types.d.ts:7](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L7)

---

### vars

• `Optional` **vars**: `Record`<`string`, `string`\>

#### Defined in

[types.d.ts:15](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/types.d.ts#L15)

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

[config.ts:17](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/config.ts#L17)

---

### csvHeaderTitles

• `Const` **csvHeaderTitles**: `string`[]

#### Defined in

[csv.ts:12](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/csv.ts#L12)

---

### helper

• `Const` **helper**: `Object`

#### Type declaration

| Name      | Type       |
| :-------- | :--------- |
| `streams` | `__module` |

#### Defined in

[index.ts:11](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/index.ts#L11)

---

### initialDefaults

• `Const` **initialDefaults**: `Readonly`<[`Config`](#interfacesconfigmd)\>

For reference, a copy of the startup defaults

#### Defined in

[config.ts:55](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/config.ts#L55)

---

### input

• **input**: `ReadInput` \| `undefined` = `"-"`

Source to read. Defaults to `-` for stdin.

#### Defined in

[config.ts:21](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/config.ts#L21)

---

### loadDotEnv

• **loadDotEnv**: `boolean` \| `Function`

Whether to load dotenv or a function to load it

#### Defined in

[config.ts:25](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/config.ts#L25)

---

### multilineSep

• **multilineSep**: `string` = `""`

Seperator for multi-line code blocks

#### Defined in

[config.ts:29](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/config.ts#L29)

---

### semgrep

• **semgrep**: `boolean` = `false`

Expect semgrep json input

#### Defined in

[config.ts:33](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/config.ts#L33)

---

### sep

• **sep**: `string` = `"\t"`

Separator for output csv

#### Defined in

[config.ts:37](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/config.ts#L37)

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

[config.ts:84](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/config.ts#L84)

---

### csv

▸ **csv**(`c`): (`source`: `AsyncIterable`<[`Match`](#interfacesmatchmd)\>) => `AsyncIterable`<`string`\>

#### Parameters

| Name | Type                            |
| :--- | :------------------------------ |
| `c`  | [`Config`](#interfacesconfigmd) |

#### Returns

`fn`

▸ (`source`): `AsyncIterable`<`string`\>

##### Parameters

| Name     | Type                                            |
| :------- | :---------------------------------------------- |
| `source` | `AsyncIterable`<[`Match`](#interfacesmatchmd)\> |

##### Returns

`AsyncIterable`<`string`\>

#### Defined in

[csv.ts:94](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/csv.ts#L94)

---

### csvHeaders

▸ **csvHeaders**(`c`): (`source`: `AsyncIterable`<`string`\>) => `AsyncGenerator`<`string`, `void`, `undefined`\>

#### Parameters

| Name | Type                            |
| :--- | :------------------------------ |
| `c`  | [`Config`](#interfacesconfigmd) |

#### Returns

`fn`

▸ (`source`): `AsyncGenerator`<`string`, `void`, `undefined`\>

##### Parameters

| Name     | Type                       |
| :------- | :------------------------- |
| `source` | `AsyncIterable`<`string`\> |

##### Returns

`AsyncGenerator`<`string`, `void`, `undefined`\>

#### Defined in

[csv.ts:29](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/csv.ts#L29)

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

[config.ts:42](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/config.ts#L42)

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

[streams.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/streams.ts#L44)

---

### gitHead

▸ **gitHead**(): (`source`: `AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\>) => `AsyncGenerator`<`Partial`<[`Match`](#interfacesmatchmd)\>, `void`, `unknown`\>

Attach the sha of main branch

#### Returns

`fn`

▸ (`source`): `AsyncGenerator`<`Partial`<[`Match`](#interfacesmatchmd)\>, `void`, `unknown`\>

##### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `source` | `AsyncIterable`<`Partial`<[`Match`](#interfacesmatchmd)\>\> |

##### Returns

`AsyncGenerator`<`Partial`<[`Match`](#interfacesmatchmd)\>, `void`, `unknown`\>

#### Defined in

[git.ts:229](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/git.ts#L229)

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

[streams.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/streams.ts#L44)

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

[streams.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/streams.ts#L44)

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

[lines.ts:8](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/lines.ts#L8)

---

### loadDotEnvOnce

▸ **loadDotEnvOnce**(): `void`

Default strategy to load dotenv first time only.

#### Returns

`void`

#### Defined in

[config.ts:75](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/config.ts#L75)

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

[group.ts:8](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/group.ts#L8)

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

[parse.ts:25](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/parse.ts#L25)

---

### parseSemgrep

▸ **parseSemgrep**(`source`): `AsyncGenerator`<`Partial`<[`Match`](#interfacesmatchmd)\>, `void`, `unknown`\>

#### Parameters

| Name     | Type                       |
| :------- | :------------------------- |
| `source` | `AsyncIterable`<`string`\> |

#### Returns

`AsyncGenerator`<`Partial`<[`Match`](#interfacesmatchmd)\>, `void`, `unknown`\>

#### Defined in

[parse.ts:119](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/parse.ts#L119)

---

### parseSemgrepMatch

▸ **parseSemgrepMatch**(`semgrep`): `Promise`<`Partial`<[`Match`](#interfacesmatchmd)\>\>

Parse semgrep json input lines

#### Parameters

| Name      | Type                       |
| :-------- | :------------------------- |
| `semgrep` | `Record`<`string`, `any`\> |

#### Returns

`Promise`<`Partial`<[`Match`](#interfacesmatchmd)\>\>

#### Defined in

[parse.ts:88](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/parse.ts#L88)

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

[config.ts:134](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/config.ts#L134)

---

### reloadDotEnv

▸ **reloadDotEnv**(): `void`

Strategy for always reloading dotenv.
Can be useful if config might change & wants freshened.

#### Returns

`void`

#### Defined in

[config.ts:66](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/config.ts#L66)

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

[streams.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/streams.ts#L44)

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

[lines.ts:42](https://github.com/pinko-fowle/gitgrep2csv/blob/8e6297f/lines.ts#L42)
