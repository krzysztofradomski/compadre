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
  } = {}) {
    this.adjectives = adjectives || adjectivesDictionary;
    this.nouns = nouns || nounsDictionary;
    this.glue = glue || '_';
    this.prefix = prefix;
    this.suffix = suffix;
    this.fallback = fallback;
    this.unique = unique || true;
    this.maxLen = maxLen || null;
    this.used = [];
  }

  init() {
    this.fetchNoun = () => {
      if (this.nouns.length > 0) {
        const index = Math.round(random(0, this.nouns.length - 1));
        const word = this.nouns[index].toUpperCase();
        this.nouns.splice(index, 1);
        this.used.push(word);
        return this.maxLen
          ? word.length <= this.maxLen ? word : this.fetchNoun()
          : word;
      } return null;
    };
    this.fetchAdjective = () => {
      if (!this.maxLen || (this.maxLen && this.adjectives.filter(word => word.length <= this.maxLen).length > 0)) {
        const index = Math.round(random(0, this.adjectives.length - 1));
        const word = this.adjectives[index].toUpperCase();
        // this.adjectives.splice(index, 1);
        // this.used.push(word);
        return this.maxLen
          ? word.length <= this.maxLen ? word : this.fetchAdjective()
          : word;
      } return null;
    };
  }

  seed(dictionary, word) {
    this[dictionary].push(word);
  }

  kill() {
    Object.keys(this).array.forEach((key) => {
      this[key] = null;
    });
  }

  generate() {
    return [
      this.prefix,
      this.fetchAdjective(),
      this.fetchNoun() || `${this.fallback ? this.fallback + this.glue : ''}${Date.now()}`,
      this.suffix,
    ]
      .filter(Boolean)
      .join(this.glue);
  }
}

window.compadre = compadre;