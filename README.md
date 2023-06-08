<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [gitgrep2csv](#gitgrep2csv)
- [Usage](#usage)
- [API](#api)
  - [Variables](#variables)
    - [helper](#helper)
  - [Functions](#functions)
    - [main](#main)
    - [mainProcess](#mainprocess)
    - [parse](#parse)
    - [print](#print)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="readmemd"></a>

# gitgrep2csv

> Turn grep results into a csv with git information on that file / commit

# Usage

```
$ grep -n foo | gitgrep2csv
```

<a name="modulesmd"></a>

# API

## Variables

### helper

• `Const` **helper**: `Object`

#### Type declaration

| Name      | Type       |
| :-------- | :--------- |
| `streams` | `__module` |

#### Defined in

[index.ts:6](https://github.com/pinko-fowle/gitgrep2csv/blob/e97354a/index.ts#L6)

## Functions

### main

▸ **main**(`c?`): `AsyncIterable`<`string`\>

Run from a config

#### Parameters

| Name | Type     |
| :--- | :------- |
| `c`  | `Config` |

#### Returns

`AsyncIterable`<`string`\>

#### Defined in

[main.ts:25](https://github.com/pinko-fowle/gitgrep2csv/blob/e97354a/main.ts#L25)

---

### mainProcess

▸ **mainProcess**(`p?`): `AsyncIterable`<`string`\>

Helper to generate a Config from `process` & run

#### Parameters

| Name | Type      | Default value |
| :--- | :-------- | :------------ |
| `p`  | `Process` | `process`     |

#### Returns

`AsyncIterable`<`string`\>

#### Defined in

[main.ts:17](https://github.com/pinko-fowle/gitgrep2csv/blob/e97354a/main.ts#L17)

---

### parse

▸ **parse**(`c`): (`source`: `AsyncIterable`<`string` \| `string`[]\>) => `AsyncIterable`<`Partial`<`Match`\>\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `c`  | `Config` |

#### Returns

`fn`

▸ (`source`): `AsyncIterable`<`Partial`<`Match`\>\>

##### Parameters

| Name     | Type                                     |
| :------- | :--------------------------------------- |
| `source` | `AsyncIterable`<`string` \| `string`[]\> |

##### Returns

`AsyncIterable`<`Partial`<`Match`\>\>

#### Defined in

[parse.ts:21](https://github.com/pinko-fowle/gitgrep2csv/blob/e97354a/parse.ts#L21)

---

### print

▸ **print**(`source`): `Promise`<`void`\>

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `source` | `AsyncIterable`<`any`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[main.ts:42](https://github.com/pinko-fowle/gitgrep2csv/blob/e97354a/main.ts#L42)
