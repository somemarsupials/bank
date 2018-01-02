'use strict';

var Bank = require('../src/bank.js').Bank;
var expect = require('chai').expect;


describe('Bank', function() {
  var bank;

  beforeEach(function() {
    bank = new Bank();
  });

  describe('#new', function() {
    it('has events log', function() {
      expect(bank.events).to.be.a('Array');
    });

    it('is created with empty events log', function() {
      expect(bank.events).to.have.lengthOf(0);
    });
  });
});
