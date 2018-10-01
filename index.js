import { nounsDictionary, adjectivesDictionary } from './dictionaries/index.js';

const random = (min, max) => Math.random() * (max - min) + min;

class compadre {
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
    this.fallback = fallback || Date.now
    this.unique = unique || false;
    this.maxLen = maxLen || null;
    this.up = up || false,
    this.used = [];
    this.fetchNoun = () => {
      if (this.nouns.length > 0) {
        const index = Math.round(random(0, this.nouns.length - 1));
        let word = this.nouns[index];
        if (this.up) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        if (this.unique) {
          this.nouns.splice(index, 1);
        }
        this.used.push(word);
        return this.maxLen
          ? word.length <= this.maxLen ? word : this.fetchNoun()
          : word;
      } return null;
    };
    this.fetchAdjective = () => {
      if (this.adjectives.length === 0) return '';
      if (!this.maxLen || (this.maxLen && this.adjectives.filter(word => word.length <= this.maxLen).length > 0)) {
        const index = Math.round(random(0, this.adjectives.length - 1));
        let word = this.adjectives[index];
        if (this.up) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        return this.maxLen
          ? word.length <= this.maxLen ? word : this.fetchAdjective()
          : word;
      } return null;
    };
  }

  seed(word) {
    this.nouns.push(word);
  }

  kill() {
    Object.keys(this).forEach((key) => {
      this[key] = null;
    });
  }

  generate() {
    return [
      this.prefix,
      this.fetchAdjective(),
      this.fetchNoun() || this.fallback(),
      this.suffix,
    ]
      .filter(Boolean)
      .join(this.glue);
  }
}

export default compadre;