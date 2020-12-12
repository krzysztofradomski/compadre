'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./dictionaries/index.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var random = function random(min, max) {
  return Math.random() * (max - min) + min;
};

var compadre = function () {
  function compadre() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        adjectives = _ref.adjectives,
        nouns = _ref.nouns,
        glue = _ref.glue,
        prefix = _ref.prefix,
        suffix = _ref.suffix,
        fallback = _ref.fallback,
        unique = _ref.unique,
        maxLen = _ref.maxLen,
        up = _ref.up;

    _classCallCheck(this, compadre);

    this.adjectives = adjectives || _index.adjectivesDictionary;
    this.nouns = nouns || _index.nounsDictionary;
    this.glue = glue || '_';
    this.prefix = prefix;
    this.suffix = suffix;
    this.fallback = fallback || function() { return Date.now() * Math.random() + '.fallback'}
    this.unique = unique || false;
    this.maxLen = maxLen || null;
    this.up = up || false, this.used = [];
    this.fetchNoun = function () {
      if (_this.nouns.length > 0) {
        var index = Math.round(random(0, _this.nouns.length - 1));
        var word = _this.nouns[index];
        if (_this.up) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        if (_this.unique) {
          _this.nouns.splice(index, 1);
        }
        _this.used.push(word);
        return _this.maxLen ? word.length <= _this.maxLen ? word : _this.fetchNoun() : word;
      }return null;
    };
    this.fetchAdjective = function () {
      if (_this.adjectives.length === 0) return '';
      if (!_this.maxLen || _this.maxLen && _this.adjectives.filter(function (word) {
        return word.length <= _this.maxLen;
      }).length > 0) {
        var index = Math.round(random(0, _this.adjectives.length - 1));
        var word = _this.adjectives[index];
        if (_this.up) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        return _this.maxLen ? word.length <= _this.maxLen ? word : _this.fetchAdjective() : word;
      }return null;
    };
  }

  _createClass(compadre, [{
    key: 'seed',
    value: function seed(word) {
      this.nouns.push(word);
    }
  }, {
    key: 'kill',
    value: function kill() {
      var _this2 = this;

      Object.keys(this).forEach(function (key) {
        _this2[key] = null;
        delete _this2[key];
      });
    }
  }, {
    key: 'generate',
    value: function generate() {
      return [this.prefix, this.fetchAdjective(), this.fetchNoun() || this.fallback(), this.suffix].filter(Boolean).join(this.glue);
    }
  }]);

  return compadre;
}();

module.exports = compadre;
