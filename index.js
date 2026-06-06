'use strict';

const { adjectivesDictionary, nounsDictionary } = require('./dictionaries/index.js');

const random = (min, max) => Math.random() * (max - min) + min;

class Compadre {
  constructor({
    adjectives,
    nouns,
    glue,
    prefix,
    suffix,
    fallback,
    unique,
    maxLen,
    up,
  } = {}) {
    this.adjectives = adjectives || adjectivesDictionary;
    this.nouns = nouns || nounsDictionary;
    this.glue = glue || '_';
    this.prefix = prefix;
    this.suffix = suffix;
    this.fallback = fallback || (() => `${Date.now() * Math.random()}.fallback`);
    this.unique = unique || false;
    this.maxLen = maxLen || null;
    this.up = up || false;
    this.used = [];
  }

  fetchNoun() {
    if (this.nouns.length === 0) return null;
    const index = Math.round(random(0, this.nouns.length - 1));
    let word = this.nouns[index];
    if (this.up) word = word.charAt(0).toUpperCase() + word.slice(1);
    if (this.unique) this.nouns.splice(index, 1);
    this.used.push(word);
    return this.maxLen ? (word.length <= this.maxLen ? word : this.fetchNoun()) : word;
  }

  fetchAdjective() {
    if (this.adjectives.length === 0) return '';
    if (this.maxLen && !this.adjectives.some(w => w.length <= this.maxLen)) return null;
    const index = Math.round(random(0, this.adjectives.length - 1));
    let word = this.adjectives[index];
    if (this.up) word = word.charAt(0).toUpperCase() + word.slice(1);
    return this.maxLen ? (word.length <= this.maxLen ? word : this.fetchAdjective()) : word;
  }

  generate() {
    return [this.prefix, this.fetchAdjective(), this.fetchNoun() || this.fallback(), this.suffix]
      .filter(Boolean)
      .join(this.glue);
  }

  seed(word) {
    this.nouns.push(word);
  }

  kill() {
    for (const key of Object.keys(this)) {
      this[key] = null;
      delete this[key];
    }
  }
}

module.exports = Compadre;
