'use strict';

var Bank = require('../src/bank.js').Bank;
var sinon = require('sinon');
var expect = require('chai').expect;


describe('Bank', function() {
  var bank;
  var eventConstructor;
  var event;

  beforeEach(function() {
    event = sinon.spy();
    eventConstructor = sinon.spy();
    bank = new Bank(eventConstructor);
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

    it('has event constructor', function() {
      expect(bank._eventConstructor).to.equal(eventConstructor);
    });
  });

  describe('#deposit', function() {
    beforeEach(function() {

    });

    describe('creates new Event with deposited amount', function() {

    });
  });
});
