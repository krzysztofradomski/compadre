# Compadre
A random name generator, giving you a unique and non-offensive two-piece name for your frontend app needs.
## Install
```
$ npm install compadre
```
## Run tests
```

```
## Run example script
I included a sample file with some various use cases, decorators, list-overrides, etc.
```
$ npm run demo
```
## Quickstart
```javascript
import compadre from 'compadre';
const nameGenerator = new compadre.init();
const name1 = nameGenerator.generate();
console.log(name1); // funky_swordfish
```
## Important methods
The exposed methods are `init()` and `generate()`. There's also `seed(dictionary, word)` and `kill()`.
`Init` and `generate()` are the necessary ones. `seed()` is optional and allows you to push new words into dictionary,
it can be useful e.g. when you use a short list of custom names and want to recycle the used ones back into the pool.
`kill` is for when you really want to help out the garbage collector.
### compadre.init()
When you import compadre, you will need to invoke `init()` and optionally pass in an `options` object, 
which will contain any or all of these overrides: 
| Option       | Type     | Default        | Description |
| ------------ | -------- | -------------- | ----------- |
| *adjectives* | Array    | [Included](https://github.com/krzysztofradomski)     | A list of adjectives or surnames. |
| *nouns*      | Array    | [Included](https://github.com/krzysztofradomski)     | A list of adjectives or surnames. |
| *prefix*     | String   | not included                                         | A prefix.                         |
| *suffix*     | String   | not included                                         | A suffix.                         |
| *glue*       | String   | `_`           | When a name is generated, all the words will be glued together using this string.  |
| *unique*     | Boolean  | *true*        | Nouns will be unique, not like in some other generators!                 |
| *fallback*   | String   | `Date.now()`  | Unique names means you can run out of dictionary! If you use custom lists and unique names, be sure to provide a good fallback word, else a datestamp will be used.    |
| *up*     | Boolean      | *false*       | Whether or not the first letter will be uppercase.                       |
The `init()` method creates a class instance with a `generate()` method.
### const nameGenerator = compadre.init();
### const yourUniqueName = nameGenerator().generate();
After you call `init`, you can then call `generate()` which will build your name. It takes an array of fragment getters. 
If you pass anything else into the array, `generate()` will throw an `'Unknown getter method passed to compadre.generate()'` error.
## Usage
This is intended to be used to generate random names of two parts, you can use it however you see fit with whatever 
lists and decorators you require.
### Simple interface
```javascript
import compadre from 'compadre';

const compadre1 = new compadre.init();
const name1 = compadre1.generate();    // blue_swede

const compadre2 = new compadre.init({prefix: 'l33t'});
const name2 = compadre2.generate();    // l33t_tarnished_silver

const compadre3 = new compadre.init({glue: '**'});
const name3 = compadre3.generate();     // big**boss

etc...
```
### Provide your own word lists
Compadre includes two list of neutral and non-offensive words: nouns and adjectives, but you can provide your own instead. Provided 
lists will overwrite the included lists.
You can override one or both of the lists.
```javascript
import compadre from 'compadre';

const superheroes = {
  adjectives : ['super', 'captain', 'awesome'],
  nouns   : ['metal', 'gear', 'solid'],
  suffix   : ['man', 'woman'],
  glue: '',
  unique: false,
  up: true,
};

const compadre = new compadre.init(superheroes);

var name1 = compadre.generate(); // CaptainMetalMan
var name2 = compadre.generate(); // SuperSolidWoman
var name3 = compadre.generate(); // SuperSolidMan
```
### Credits
Inspired by [Goby](https://github.com/SeanCannon/goby)
### License 
MIT, feel free to use to your heart's desire.
