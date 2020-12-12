const expect = require('chai').expect;
const compadre = require('./index');

describe('compadre', function() {
  describe('init', function() {
    const nameGenerator = new compadre();
    it('should give a new instance of Compadre when called with the new keyword', function() {
      expect(nameGenerator).to.satisfy(isIntanceOfCompadre);
      function isIntanceOfCompadre(item) {
        return item instanceof compadre;
      }
    });
  });
  describe('generate', function() {
    let nameGenerator = new compadre();
    it('should work with default settings', function() {
      expect(nameGenerator.generate()).to.satisfy(item => typeof item === 'string');
    });
    nameGenerator = new compadre({glue: "*"});
    it('should work with custom glue settings', function() {
      expect(nameGenerator.generate({glue: '*'}).includes('*')).to.be.true;
    });
  });
  describe('seed', function() {
    const nameGenerator = new compadre({adjectives: [], nouns: [], unique: false});
    it('should be possible to seed a custom word', function() {
      nameGenerator.seed('seed')
      expect(nameGenerator.generate()).to.equal('seed');
      expect(nameGenerator.generate()).to.equal('seed');
      expect(nameGenerator.generate()).to.equal('seed');
    });
  });
  describe('kill', function() {
    it('should be possible to clear the compadre object of its contents', function() {
      const nameGenerator = new compadre();
      nameGenerator.kill();
      expect(Object.keys(nameGenerator).length === 0).to.be.true;
    });
  });
});
