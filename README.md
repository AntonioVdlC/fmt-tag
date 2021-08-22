# fmt-tag

[![version](https://img.shields.io/npm/v/fmt-tag.svg)](http://npm.im/fmt-tag)
[![issues](https://img.shields.io/github/issues-raw/antoniovdlc/fmt-tag.svg)](https://github.com/AntonioVdlC/fmt-tag/issues)
[![downloads](https://img.shields.io/npm/dt/fmt-tag.svg)](http://npm.im/fmt-tag)
[![license](https://img.shields.io/npm/l/fmt-tag.svg)](http://opensource.org/licenses/MIT)

Format template literals.

## Installation

This package is distributed via npm:

```
npm install fmt-tag
```

## Motivation

Template literals and template tags provide a unique API to build tools around strings. 
What started as a fun blog post about template tags ended up being this full-fledged library that might hopefully be useful to someone!

## Usage

You can use this library either as an ES module or a CommonJS package:
```js
import fmt from "fmt-tag";
```
*- or -*
```js
const fmt = require("fmt-tag");
```
> Please note that this library uses extensively `Intl`, which is not supported on older browsers (https://caniuse.com/?search=Intl) or Node versions < 16.

You can tag any template literal and append formatting hints right after interpolations to apply specific formatting to that substitutive value. 
```js
const name = "Alice";
const money = 20;

console.log(fmt`${name} has ${money}:c(USD) in her pocket!`);
// "Alice has $20 in her pocket!"
```

Hints can also be dynamic, for example displaying a specific currency based on a `country` variable, as follows:
```js
const name = "Alice";
const money = 20;
const country = "UK";

console.log(fmt`${name} has ${money}:c(${country === "UK" ? "GBP" : "USD"}) in her pocket!`);
// "Alice has £20 in her pocket!"
```

> The formatting uses the host's default language settings. You can also pass in a specific locale via `fmt.use(locale)`.

### fmt.use(locale: string)
Sets a locale to be used when formatting template literals. By default, the formatting will use the host's default language settings.

## Formatters

There are a few formatters available (more to come!).

### Currency
| Key | Options |
| --- | --- |
| `:c` | Any valid currency symbol (e.g. `:c(USD)`, `:c(EUR)`, ...) |

### Date
| Key | Options |
| --- | --- |
| `:d` | - `:d(DD-MM-YYYY)` => `01/01/1970` <br/>- `:d(DD-mm-YYYY)` => `1 Jan 1970` <br/>- `:d(DD-mmm-YYYY)` => `1 January 1970` <br/>- `:d(ddd-mmm-YYYY)` => `Thursday, 1 January 1970` |

### Number
| Key | Options |
| --- | --- |
| `:n` | Number of digits (e.g. `:n(2)` => `42.00`) |

### Relative Time
| Key | Options |
| --- | --- |
| `:r` | RelativeTimeUnit (e.g. `${-1}:r(weeks)` => `last week`) |

### String
| Key | Options |
| --- | --- |
| `:s` <br/>(default) | - `:s` => No transformation <br/>- `:s(U)` => Uppercase <br/>- `:s(l)` => lowercase |

### Time
| Key | Options |
| --- | --- |
| `:t` | - `:t(HH:mm)` => `06:56` <br/>- `:t(HH:mm aa)` => `06:56 am` <br/>- `:t(HH:mm:ss)` => `06:56:07` <br/>- `:t(HH:mm:ss aa)` => `06:56:07 am` <br/>- `:t(HH:mm:ss TZ)` => `06:56:07 UTC` <br/>- `:t(HH:mm:ss TZ+)` => `06:56:07 Coordinated Universal Time` |

### Custom formatters

Custom formatters can be registerd using `fmt.register(tag, fn)`. This allows for user-created formatters that can then be used as the pre-existing formatters. 

To avoid any potential conflicts or overrides, custom formatters need to have an uppercase tag, whereas pre-defined formatters always use a lowercase character.

```js
const tag = "V";
const fn = function (locale) {
  return function (str, option) {
    // Yes, you can use other formatters in custom formatters!
    return fmt`${str} version ${option}:n(1)`;
  };
};

fmt.register(tag, fn);

const name = "Alice";

console.log(fmt`Welcome to ${name}:V(3)!`);
// "Welcome to Alice version 3.0!"
```
> Note that registering multiple custom formatters with the same tag will override previously registered ones.

## Acknowledgements
Thanks to Jack Hsu and his article on implementing an internationalization library using template literals (https://jaysoo.ca/2014/03/20/i18n-with-es2015-template-literals/) for the inspiration!

## License
MIT
