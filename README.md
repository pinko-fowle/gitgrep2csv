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
- [Interface: GitBlameBase](#interface-gitblamebase)
  - [Hierarchy](#hierarchy-1)
  - [Properties](#properties-2)
    - [author](#author-1)
    - [authorEmail](#authoremail-1)
    - [authorTime](#authortime-1)
    - [committer](#committer-1)
    - [committerEmail](#committeremail-1)
    - [committerTime](#committertime-1)
    - [previous](#previous-1)
    - [rev](#rev-1)
    - [summary](#summary-1)
- [Interface: GitMerge](#interface-gitmerge)
  - [Hierarchy](#hierarchy-2)
  - [Properties](#properties-3)
    - [author](#author-2)
    - [authorEmail](#authoremail-2)
    - [authorTime](#authortime-2)
    - [branch](#branch)
    - [committer](#committer-2)
    - [committerEmail](#committeremail-2)
    - [committerTime](#committertime-2)
    - [parent](#parent)
    - [pr](#pr)
    - [previous](#previous-2)
    - [rev](#rev-2)
    - [summary](#summary-2)
- [Interface: Match](#interface-match)
  - [Properties](#properties-4)
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
    - [headerTitles](#headertitles)
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
    - [defaults](#defaults)
    - [gitBlame](#gitblame)
    - [gitHead](#githead)
    - [gitProject](#gitproject)
    - [githubPr](#githubpr)
    - [lines](#lines-1)
    - [loadDotEnvOnce](#loaddotenvonce)
    - [md](#md)
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

[types.d.ts:64](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L64)

---

### appName

• **appName**: `string`

#### Defined in

[types.d.ts:63](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L63)

---

### input

• `Optional` **input**: `any`

#### Defined in

[types.d.ts:65](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L65)

---

### loadDotEnv

• `Optional` **loadDotEnv**: `boolean` \| `Function`

#### Defined in

[types.d.ts:66](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L66)

---

### multilineSep

• `Optional` **multilineSep**: `null` \| `string` \| `RegExp`

#### Defined in

[types.d.ts:67](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L67)

---

### process

• `Optional` **process**: `any`

#### Defined in

[types.d.ts:70](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L70)

---

### semgrep

• **semgrep**: `boolean`

#### Defined in

[types.d.ts:68](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L68)

---

### sep

• **sep**: `string`

#### Defined in

[types.d.ts:69](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L69)

<a name="interfacesgitblamemd"></a>

# Interface: GitBlame

A single commit & single file's parsed Git Blame

## Hierarchy

- [`GitBlameBase`](#interfacesgitblamebasemd)

  ↳ **`GitBlame`**

## Properties

### author

• **author**: `string`

Git author of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[author](#author)

#### Defined in

[types.d.ts:84](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L84)

---

### authorEmail

• **authorEmail**: `string`

Git author email of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[authorEmail](#authoremail)

#### Defined in

[types.d.ts:88](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L88)

---

### authorTime

• **authorTime**: `Date`

Author time of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[authorTime](#authortime)

#### Defined in

[types.d.ts:92](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L92)

---

### authorTz

• `Optional` **authorTz**: `number`

Timezone of author date

#### Defined in

[types.d.ts:122](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L122)

---

### committer

• **committer**: `string`

Committer name of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[committer](#committer)

#### Defined in

[types.d.ts:96](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L96)

---

### committerEmail

• **committerEmail**: `string`

Committer email of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[committerEmail](#committeremail)

#### Defined in

[types.d.ts:100](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L100)

---

### committerTime

• **committerTime**: `Date`

Committer time of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[committerTime](#committertime)

#### Defined in

[types.d.ts:104](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L104)

---

### committerTz

• `Optional` **committerTz**: `number`

Timezone of committer date

#### Defined in

[types.d.ts:126](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L126)

---

### lines

• `Optional` **lines**: `number`[]

Lines of file this blame applies to

#### Defined in

[types.d.ts:130](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L130)

---

### previous

• `Optional` **previous**: `string`

Previous sha of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[previous](#previous)

#### Defined in

[types.d.ts:108](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L108)

---

### rev

• **rev**: `string`

revision-sha of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[rev](#rev)

#### Defined in

[types.d.ts:80](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L80)

---

### summary

• **summary**: `string`

Summary text for this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[summary](#summary)

#### Defined in

[types.d.ts:112](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L112)

<a name="interfacesgitblamebasemd"></a>

# Interface: GitBlameBase

Common "blame" information shared by either a line-by-line style git-blame, or by a merge commit.

## Hierarchy

- **`GitBlameBase`**

  ↳ [`GitBlame`](#interfacesgitblamemd)

  ↳ [`GitMerge`](#interfacesgitmergemd)

## Properties

### author

• **author**: `string`

Git author of this blame.

#### Defined in

[types.d.ts:84](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L84)

---

### authorEmail

• **authorEmail**: `string`

Git author email of this blame.

#### Defined in

[types.d.ts:88](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L88)

---

### authorTime

• **authorTime**: `Date`

Author time of this blame.

#### Defined in

[types.d.ts:92](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L92)

---

### committer

• **committer**: `string`

Committer name of this blame.

#### Defined in

[types.d.ts:96](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L96)

---

### committerEmail

• **committerEmail**: `string`

Committer email of this blame.

#### Defined in

[types.d.ts:100](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L100)

---

### committerTime

• **committerTime**: `Date`

Committer time of this blame.

#### Defined in

[types.d.ts:104](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L104)

---

### previous

• `Optional` **previous**: `string`

Previous sha of this blame.

#### Defined in

[types.d.ts:108](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L108)

---

### rev

• **rev**: `string`

revision-sha of this blame.

#### Defined in

[types.d.ts:80](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L80)

---

### summary

• **summary**: `string`

Summary text for this blame.

#### Defined in

[types.d.ts:112](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L112)

<a name="interfacesgitmergemd"></a>

# Interface: GitMerge

Blame information for a git merge, typically parsed from Github format PR messages.

## Hierarchy

- [`GitBlameBase`](#interfacesgitblamebasemd)

  ↳ **`GitMerge`**

## Properties

### author

• **author**: `string`

Git author of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[author](#author)

#### Defined in

[types.d.ts:84](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L84)

---

### authorEmail

• **authorEmail**: `string`

Git author email of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[authorEmail](#authoremail)

#### Defined in

[types.d.ts:88](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L88)

---

### authorTime

• **authorTime**: `Date`

Author time of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[authorTime](#authortime)

#### Defined in

[types.d.ts:92](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L92)

---

### branch

• `Optional` **branch**: `string`

Branch name, parsed from summary.

#### Defined in

[types.d.ts:148](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L148)

---

### committer

• **committer**: `string`

Committer name of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[committer](#committer)

#### Defined in

[types.d.ts:96](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L96)

---

### committerEmail

• **committerEmail**: `string`

Committer email of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[committerEmail](#committeremail)

#### Defined in

[types.d.ts:100](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L100)

---

### committerTime

• **committerTime**: `Date`

Committer time of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[committerTime](#committertime)

#### Defined in

[types.d.ts:104](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L104)

---

### parent

• **parent**: `string`[]

The parent commits for this merge

#### Defined in

[types.d.ts:140](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L140)

---

### pr

• `Optional` **pr**: `number`

Pull request number, parsed from summary.

#### Defined in

[types.d.ts:144](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L144)

---

### previous

• `Optional` **previous**: `string`

Previous sha of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[previous](#previous)

#### Defined in

[types.d.ts:108](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L108)

---

### rev

• **rev**: `string`

revision-sha of this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[rev](#rev)

#### Defined in

[types.d.ts:80](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L80)

---

### summary

• **summary**: `string`

Summary text for this blame.

#### Inherited from

[GitBlameBase](#interfacesgitblamebasemd).[summary](#summary)

#### Defined in

[types.d.ts:112](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L112)

<a name="interfacesmatchmd"></a>

# Interface: Match

A grep match. Listed vaguely in order of display in csv,

## Properties

### commits

• `Optional` **commits**: `Record`<`string`, [`GitBlame`](#interfacesgitblamemd)\>

All commits found for this match, by sha.

#### Defined in

[types.d.ts:34](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L34)

---

### head

• **head**: `string`

Current rev this project is on.

#### Defined in

[types.d.ts:46](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L46)

---

### lineEnd

• **lineEnd**: `number`

Line where this match ends.

#### Defined in

[types.d.ts:30](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L30)

---

### lineStart

• **lineStart**: `number`

Line where this match starts.

#### Defined in

[types.d.ts:26](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L26)

---

### matchedPath

• **matchedPath**: `string`

Path that grep found for this match.

#### Defined in

[types.d.ts:9](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L9)

---

### matches

• `Optional` **matches**: `number`[]

List of exact line numbers where there is a match.
Since lineStart & lineEnd might include --before, --after, --context grep context.

#### Defined in

[types.d.ts:52](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L52)

---

### merges

• `Optional` **merges**: `Record`<`string`, [`GitMerge`](#interfacesgitmergemd)\>

All prs found for this match, by sha.

#### Defined in

[types.d.ts:38](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L38)

---

### path

• **path**: `string`

Path of file inside the project for this match.

#### Defined in

[types.d.ts:22](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L22)

---

### project

• **project**: `string`

Project directory name for this match.

#### Defined in

[types.d.ts:18](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L18)

---

### rootDir

• **rootDir**: `string`

Directory where we found this project

#### Defined in

[types.d.ts:56](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L56)

---

### text

• **text**: `string`

Text of this match.

#### Defined in

[types.d.ts:13](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L13)

---

### vars

• `Optional` **vars**: `Record`<`string`, `string`\>

Any free-variables captured by semgrep.

#### Defined in

[types.d.ts:42](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/types.d.ts#L42)

<a name="modulesmd"></a>

# API

## Interfaces

- [Config](#interfacesconfigmd)
- [GitBlame](#interfacesgitblamemd)
- [GitBlameBase](#interfacesgitblamebasemd)
- [GitMerge](#interfacesgitmergemd)
- [Match](#interfacesmatchmd)

## Variables

### appName

• **appName**: `string` = `"gitgrep"`

Assign a name, primarily to use for env variable prefix

#### Defined in

[config.ts:17](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/config.ts#L17)

---

### headerTitles

• `Const` **headerTitles**: `string`[]

#### Defined in

[csv.ts:21](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/csv.ts#L21)

---

### helper

• `Const` **helper**: `Object`

#### Type declaration

| Name      | Type       |
| :-------- | :--------- |
| `streams` | `__module` |

#### Defined in

[index.ts:11](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/index.ts#L11)

---

### initialDefaults

• `Const` **initialDefaults**: `Readonly`<[`Config`](#interfacesconfigmd)\>

For reference, a copy of the startup defaults

#### Defined in

[config.ts:55](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/config.ts#L55)

---

### input

• **input**: `ReadInput` \| `undefined` = `"-"`

Source to read. Defaults to `-` for stdin.

#### Defined in

[config.ts:21](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/config.ts#L21)

---

### loadDotEnv

• **loadDotEnv**: `boolean` \| `Function`

Whether to load dotenv or a function to load it

#### Defined in

[config.ts:25](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/config.ts#L25)

---

### multilineSep

• **multilineSep**: `string` = `""`

Seperator for multi-line code blocks

#### Defined in

[config.ts:29](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/config.ts#L29)

---

### semgrep

• **semgrep**: `boolean` = `false`

Expect semgrep json input

#### Defined in

[config.ts:33](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/config.ts#L33)

---

### sep

• **sep**: `string` = `"\t"`

Separator for output csv

#### Defined in

[config.ts:37](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/config.ts#L37)

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

[config.ts:84](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/config.ts#L84)

---

### csv

▸ **csv**(`c`): (`source`: `AsyncIterable`<[`Match`](#interfacesmatchmd)\>) => `AsyncGenerator`<`string`, `void`, `unknown`\>

Extra & write csv data

#### Parameters

| Name | Type                            |
| :--- | :------------------------------ |
| `c`  | [`Config`](#interfacesconfigmd) |

#### Returns

`fn`

▸ (`source`): `AsyncGenerator`<`string`, `void`, `unknown`\>

##### Parameters

| Name     | Type                                            |
| :------- | :---------------------------------------------- |
| `source` | `AsyncIterable`<[`Match`](#interfacesmatchmd)\> |

##### Returns

`AsyncGenerator`<`string`, `void`, `unknown`\>

#### Defined in

[csv.ts:170](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/csv.ts#L170)

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

[config.ts:42](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/config.ts#L42)

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

[streams.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/streams.ts#L44)

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

[git.ts:229](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/git.ts#L229)

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

[streams.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/streams.ts#L44)

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

[streams.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/streams.ts#L44)

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

[lines.ts:8](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/lines.ts#L8)

---

### loadDotEnvOnce

▸ **loadDotEnvOnce**(): `void`

Default strategy to load dotenv first time only.

#### Returns

`void`

#### Defined in

[config.ts:75](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/config.ts#L75)

---

### md

▸ **md**(`c`): (`source`: `AsyncIterable`<[`Match`](#interfacesmatchmd)\>) => `AsyncGenerator`<`string`, `void`, `unknown`\>

#### Parameters

| Name | Type                            |
| :--- | :------------------------------ |
| `c`  | [`Config`](#interfacesconfigmd) |

#### Returns

`fn`

▸ (`source`): `AsyncGenerator`<`string`, `void`, `unknown`\>

##### Parameters

| Name     | Type                                            |
| :------- | :---------------------------------------------- |
| `source` | `AsyncIterable`<[`Match`](#interfacesmatchmd)\> |

##### Returns

`AsyncGenerator`<`string`, `void`, `unknown`\>

#### Defined in

[csv.ts:200](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/csv.ts#L200)

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

[group.ts:8](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/group.ts#L8)

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

[parse.ts:25](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/parse.ts#L25)

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

[parse.ts:119](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/parse.ts#L119)

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

[parse.ts:88](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/parse.ts#L88)

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

[config.ts:134](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/config.ts#L134)

---

### reloadDotEnv

▸ **reloadDotEnv**(): `void`

Strategy for always reloading dotenv.
Can be useful if config might change & wants freshened.

#### Returns

`void`

#### Defined in

[config.ts:66](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/config.ts#L66)

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

[streams.ts:44](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/streams.ts#L44)

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

[lines.ts:42](https://github.com/pinko-fowle/gitgrep2csv/blob/cf7aea7/lines.ts#L42)
