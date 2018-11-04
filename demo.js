const compadre = require('./index');


let c = new compadre();
const name = c.generate();
console.log('\x1b[33m%s\x1b[0m', 'Basic usage');
console.log(name);
console.log('\n');


const superheroes = {
  adjectives: ['super', 'captain', 'awesome'],
  nouns: ['metal', 'gear', 'solid'],
  suffix: 'Man',
  glue: '',
  unique: false,
  up: true,
};
c = new compadre(superheroes);
const name1 = c.generate();
const name2 = c.generate();
const name3 = c.generate();
console.log('\x1b[33m%s\x1b[0m', 'Superheroes');
console.log(name1);
console.log(name2);
console.log(name3);
console.log('\n');


c = new compadre({prefix: 'l33t'});
const name4 = c.generate();
console.log('\x1b[33m%s\x1b[0m', 'Prefix l33t');
console.log(name4);
console.log('\n');


c = new compadre({glue: '**'});
const name5 = c.generate();
console.log('\x1b[33m%s\x1b[0m', 'Glue **');
console.log(name5);
console.log('\n');


const basic = {
  adjectives: [],
  nouns: ['man', 'Bear', 'pig'],
  up: true,
  unique: true,
  fallback: () => `${Date.now()}-Anon`,
};
c = new compadre(basic);
console.log('\x1b[33m%s\x1b[0m', 'Callback and seeding');
for (let index = 0; index <= 5; index++) {
  let word = c.generate();
  if (/Anon/.test(word)) {
    c.seed('annie');
  }
  console.log(word);
};
console.log('\n');