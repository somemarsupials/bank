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

    it('has total of 0', function() {
      expect(bank.total).to.equal(0);
    });
  });

  describe('#deposit', function() {
  });
});
