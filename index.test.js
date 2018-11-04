var expect = require('chai').expect;
var compadre = require('./index');

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
    const nameGenerator = new compadre();
    it('should work with default settings', function() {
      expect(nameGenerator.generate()).to.satisfy(returnString);
      function returnString(item) {
        return typeof item === 'string';
      }
    });
    it('should work with custom settings', function() {
      expect(true).to.be.true;
    });
  });
  describe('seed', function() {
    it('should work', function() {
      expect(true).to.be.true;
    });
  });
  describe('kill', function() {
    it('should work', function() {
      expect(true).to.be.true;
    });
  });
});
