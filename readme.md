# Compadre
[![](https://img.shields.io/npm/dt/compadre.svg)](https://npm-stat.com/charts.html?package=compadre) [![](https://img.shields.io/npm/l/compadre.svg)](https://opensource.org/licenses/MIT)

A random name generator, giving you a unique and sanitized two-piece name for your web app needs.
It should work in both browser and node javascript applications. Only 7kb minified and gzipped!
## Install
```
$ npm install compadre
```
## Quickstart
```javascript
import compadre from 'compadre';
// alternatively: const compadre = require('compadre');
const nameGenerator = new compadre();
const name = nameGenerator.generate();
console.log(name); // funky_swordfish
```
## Methods and config
The important functions are constructor itself and `generate()`. 
There's also `seed(word)` and `kill()`. Method `seed()` is optional and allows you to push new words into noun dictionary, it can be useful e.g. when you use a short list of custom names and want to recycle the used ones back into the pool. Method `kill` is for when you really want to help out the garbage collector.

Optionally, when instancing a new generator, `config` object can be passed with any or all of these overrides (non-existing keys will be ignored):

| Option       | Type     | Default        | Description |
| ------------ | -------- | -------------- | ----------- |
| *adjectives* | Array    | [Included](https://github.com/krzysztofradomski/compadre/blob/master/dictionaries/adjectives.js)  | A list of curated adjectives, around 520 entries long.          |
| *nouns*      | Array    | [Included](https://github.com/krzysztofradomski/compadre/blob/master/dictionaries/nouns.js)       | A list of curated nouns, around 1150 entries long.               |
| *prefix*     | String   | `null`                                         | A prefix.                                |
| *suffix*     | String   | `null`                                         | A suffix.                                |
| *glue*       | String   | `_`           | When a name is generated, all the words will be glued together using this string (default is underscore). |
| *unique*     | Boolean  | `false`       | Names can be unique, not like in some other generators! Set to `true` to have the generated names unique.                        |
| *fallback*   | Function | `function() { return Date.now() * Math.random() + '.fallback'}`  | Unique names means you can run out of dictionary! If you use custom lists and unique names, be sure to provide a good fallback word/phrase returning function, else this here will be used.                                                                                                |
| *up*         | Boolean  | `false`       | Whether or not the nouns and adjectives will be uppercased.                       |
| *maxLen*     | Integer  | `null`        | Max length of the output string. There is no default limit. Be carful when using with unique names and fallbacks.              |

## Basic usage
The constructor creates a class instance with a `generate()` method.
Default settings will generate random two-piece name.

```javascript
import compadre from 'compadre';
// alternatively: const compadre = require('compadre');

const compadre1 = new compadre();
const name1 = compadre1.generate();    // blue_swede

const compadre2 = new compadre({prefix: 'l33t'});
const name2 = compadre2.generate();    // l33t_silver_surfer

const compadre3 = new compadre({glue: '**'});
const name3 = compadre3.generate();     // big**boss
```
etc...

## Advanced usage
Compadre includes two lists of neutral and non-offensive words: nouns and adjectives, but you can provide your own instead. 
Provided lists will overwrite the included lists, you can override one or both. Note that only adjectives can be an empty list. Generally, it is wise to use config other options if your lists are not very long. See example below:

```javascript
import compadre from 'compadre';
// alternatively: const compadre = require('compadre');

const superheroes = {
  adjectives: ['super', 'captain', 'awesome'],
  nouns: ['metal', 'gear', 'solid'],
  suffix: 'Man',
  glue: '',
  unique: false,
  up: true,
};

const c = new compadre(superheroes);

const name1 = c.generate(); // CaptainMetalMan
const name2 = c.generate(); // SuperMetalMan
const name3 = c.generate(); // SuperSolidMan
```

## Fallback word and recycling words
Unique names come at a price - the noun dictionary can be depleted. To make sure each generated name is unique, you need a fallback option - a timestamp by default. You can provide your own string generating function to act as a fallback. You can also recycle used words, e.g. you create objects that need unique display names, but after you delete such an object, you can push their name back into the noun pool. 
```javascript
import compadre from 'compadre';
// alternatively: const compadre = require('compadre');
const basic = {
  adjectives: [],
  nouns: ['man', 'Bear', 'pig'],
  up: true,
  unique: true,
  fallback: () => `${Date.now()}-Anon`,
};
const c = new compadre(basic);

for (let index = 0; index <= 5; index++) {
  let word = c.generate();
  if (/Anon/.test(word)) {
    c.seed('annie');
  }
  console.log(word);
};
  // Man
  // Pig
  // Bear
  // timestamp-Anon (nouns depleted, using fallback, plus condition met and 'annie' pushed into nouns)
  // Annie (dictionary has a new entry, so it is used now)
  // timestamp-Anon (dictionary depleted again)
```
### Demo
```javascript
npm run demo
```
### Tests
A good spot you can contribute to by a making your first pr!
```javascript
npm run test
```
### Dependencies
None, except for some testing dev dependencies.
### Credits
Inspired by the lack of such libs and then finding [Goby](https://github.com/SeanCannon/goby).
### License 
MIT.
