const expect = require('chai').expect;
const Compadre = require('./index');

describe('Compadre', function () {

  // ── constructor ────────────────────────────────────────────────────────────

  describe('constructor', function () {
    it('creates an instance with new', function () {
      expect(new Compadre()).to.be.instanceOf(Compadre);
    });

    it('works with no arguments', function () {
      expect(() => new Compadre()).to.not.throw();
    });

    it('uses the built-in dictionaries by default', function () {
      const c = new Compadre();
      expect(c.adjectives.length).to.be.greaterThan(0);
      expect(c.nouns.length).to.be.greaterThan(0);
    });

    it('accepts custom adjectives and nouns arrays', function () {
      const c = new Compadre({ adjectives: ['fast'], nouns: ['car'] });
      expect(c.adjectives).to.deep.equal(['fast']);
      expect(c.nouns).to.deep.equal(['car']);
    });

    it('defaults glue to underscore', function () {
      expect(new Compadre().glue).to.equal('_');
    });

    it('defaults unique to false', function () {
      expect(new Compadre().unique).to.be.false;
    });

    it('defaults up to false', function () {
      expect(new Compadre().up).to.be.false;
    });

    it('defaults maxLen to null', function () {
      expect(new Compadre().maxLen).to.be.null;
    });

    it('initialises the used array as empty', function () {
      expect(new Compadre().used).to.deep.equal([]);
    });
  });

  // ── generate ───────────────────────────────────────────────────────────────

  describe('generate', function () {
    it('returns a string', function () {
      expect(new Compadre().generate()).to.be.a('string');
    });

    it('joins adjective and noun with default underscore glue', function () {
      const c = new Compadre({ adjectives: ['big'], nouns: ['rock'] });
      expect(c.generate()).to.equal('big_rock');
    });

    it('uses a custom glue character', function () {
      const c = new Compadre({ adjectives: ['big'], nouns: ['rock'], glue: '-' });
      expect(c.generate()).to.equal('big-rock');
    });

    it('prepends the prefix', function () {
      const c = new Compadre({ adjectives: ['big'], nouns: ['rock'], prefix: 'the' });
      expect(c.generate()).to.equal('the_big_rock');
    });

    it('appends the suffix', function () {
      const c = new Compadre({ adjectives: ['big'], nouns: ['rock'], suffix: '99' });
      expect(c.generate()).to.equal('big_rock_99');
    });

    it('combines prefix, adjective, noun and suffix', function () {
      const c = new Compadre({ adjectives: ['big'], nouns: ['rock'], prefix: 'the', suffix: '99' });
      expect(c.generate()).to.equal('the_big_rock_99');
    });

    it('capitalises first letter of each word when up is true', function () {
      const c = new Compadre({ adjectives: ['big'], nouns: ['rock'], up: true });
      expect(c.generate()).to.equal('Big_Rock');
    });

    it('omits the adjective part when adjectives list is empty', function () {
      const c = new Compadre({ adjectives: [], nouns: ['rock'] });
      expect(c.generate()).to.equal('rock');
    });

    it('invokes the default fallback when the nouns pool is empty', function () {
      const c = new Compadre({ adjectives: [], nouns: [] });
      expect(c.generate()).to.match(/\.fallback$/);
    });

    it('invokes a custom fallback when the nouns pool is empty', function () {
      const c = new Compadre({ adjectives: [], nouns: [], fallback: () => 'gone' });
      expect(c.generate()).to.equal('gone');
    });

    it('produces different names across calls (statistical)', function () {
      const c = new Compadre();
      const results = new Set(Array.from({ length: 20 }, () => c.generate()));
      expect(results.size).to.be.greaterThan(1);
    });
  });

  // ── unique mode ────────────────────────────────────────────────────────────

  describe('unique mode', function () {
    it('removes the used noun from the pool', function () {
      const c = new Compadre({ adjectives: [], nouns: ['alpha', 'beta', 'gamma'], unique: true });
      c.generate();
      expect(c.nouns.length).to.equal(2);
    });

    it('never repeats a noun until the pool is exhausted', function () {
      const words = ['alpha', 'beta', 'gamma'];
      const c = new Compadre({ adjectives: [], nouns: [...words], unique: true });
      const results = [c.generate(), c.generate(), c.generate()];
      expect(results).to.have.members(words);
    });

    it('falls back once the pool is exhausted', function () {
      const c = new Compadre({ adjectives: [], nouns: ['only'], unique: true, fallback: () => 'done' });
      c.generate();
      expect(c.generate()).to.equal('done');
    });
  });

  // ── maxLen ─────────────────────────────────────────────────────────────────

  describe('maxLen', function () {
    it('only uses nouns within the length limit', function () {
      // 'x' (1 char) fits; 'toolong' (7 chars) does not
      const c = new Compadre({ adjectives: [], nouns: ['x', 'toolong'], maxLen: 3 });
      for (let i = 0; i < 10; i++) {
        expect(c.generate()).to.equal('x');
      }
    });

    it('only uses adjectives within the length limit', function () {
      // 'ok' (2 chars) fits; 'enormous' (8 chars) does not
      const c = new Compadre({ adjectives: ['ok', 'enormous'], nouns: ['z'], maxLen: 3 });
      for (let i = 0; i < 10; i++) {
        expect(c.generate()).to.equal('ok_z');
      }
    });

    it('fetchAdjective returns null when all adjectives exceed maxLen', function () {
      const c = new Compadre({ adjectives: ['toolong'], nouns: ['x'], maxLen: 3 });
      expect(c.fetchAdjective()).to.be.null;
    });
  });

  // ── seed ───────────────────────────────────────────────────────────────────

  describe('seed', function () {
    it('adds a word to the nouns pool', function () {
      const c = new Compadre({ adjectives: [], nouns: [] });
      c.seed('new');
      expect(c.nouns).to.include('new');
    });

    it('makes the seeded word available for generation', function () {
      const c = new Compadre({ adjectives: [], nouns: [] });
      c.seed('hello');
      expect(c.generate()).to.equal('hello');
    });

    it('can re-seed after unique mode exhausts the pool', function () {
      const c = new Compadre({ adjectives: [], nouns: ['word'], unique: true, fallback: () => 'fb' });
      c.generate();
      c.seed('refilled');
      expect(c.generate()).to.equal('refilled');
    });
  });

  // ── used tracking ──────────────────────────────────────────────────────────

  describe('used', function () {
    it('records the noun from each generate call', function () {
      const c = new Compadre({ adjectives: [], nouns: ['rock'] });
      c.generate();
      expect(c.used).to.include('rock');
    });

    it('accumulates across multiple calls', function () {
      const c = new Compadre({ adjectives: [], nouns: ['alpha', 'beta', 'gamma'], unique: true });
      c.generate();
      c.generate();
      c.generate();
      expect(c.used.length).to.equal(3);
    });
  });

  // ── fetchNoun ──────────────────────────────────────────────────────────────

  describe('fetchNoun', function () {
    it('returns null when the nouns pool is empty', function () {
      expect(new Compadre({ nouns: [] }).fetchNoun()).to.be.null;
    });

    it('capitalises the first letter when up is true', function () {
      const c = new Compadre({ nouns: ['rock'], up: true });
      expect(c.fetchNoun()).to.equal('Rock');
    });

    it('returns a word from the pool', function () {
      const c = new Compadre({ nouns: ['rock'] });
      expect(c.fetchNoun()).to.equal('rock');
    });
  });

  // ── fetchAdjective ─────────────────────────────────────────────────────────

  describe('fetchAdjective', function () {
    it('returns an empty string when the adjectives pool is empty', function () {
      expect(new Compadre({ adjectives: [] }).fetchAdjective()).to.equal('');
    });

    it('capitalises the first letter when up is true', function () {
      const c = new Compadre({ adjectives: ['big'], up: true });
      expect(c.fetchAdjective()).to.equal('Big');
    });

    it('returns a word from the pool', function () {
      const c = new Compadre({ adjectives: ['big'] });
      expect(c.fetchAdjective()).to.equal('big');
    });
  });

  // ── kill ───────────────────────────────────────────────────────────────────

  describe('kill', function () {
    it('removes all own properties from the instance', function () {
      const c = new Compadre();
      c.kill();
      expect(Object.keys(c).length).to.equal(0);
    });
  });

});
