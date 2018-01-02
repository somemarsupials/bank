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
    eventConstructor = sinon.stub();
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
    describe('when depositing an amount', function() {
      beforeEach(function() {
        sinon.stub(bank, '_newEvent').returns(100);
        bank.deposit(100)
      });

      it('calls _newEvent', function() {
        expect(bank._newEvent.calledWith(100, true)).to.be.true;
      });

      it('adds 100 to total', function() {
        expect(bank.total).to.equal(100);
      });
    });
  });

  describe('#withdraw', function() {
    describe('when withdrawing an amount', function() {
      beforeEach(function() {
        sinon.stub(bank, '_newEvent').returns(-100);
        bank.withdraw(100)
      });

      it('calls _newEvent', function() {
        expect(bank._newEvent.calledWith(100, false)).to.be.true;
      });

      it('adds 100 to total', function() {
        expect(bank.total).to.equal(-100);
      });
    });
  });

  describe('#_newEvent', function() {
    beforeEach(function() {
      eventConstructor.returns(event);
    });

    describe('when creating new deposit event', function() {
      beforeEach(function() {
        bank._newEvent(100, true);
      });

      it('creates event object with value and deposit', function() {
        expect(eventConstructor.calledWith(100)).to.be.true;
      });

      it('collects new event in event log', function() {
        expect(bank.events).to.contain(event)
      });
    });

    describe('when creating new withdrawal event', function() {
      beforeEach(function() {
        bank._newEvent(100, false);
      });

      it('creates event object with value and deposit', function() {
        expect(eventConstructor.calledWith(-100)).to.be.true;
      });

      it('collects new event in event log', function() {
        expect(bank.events).to.contain(event)
      });
    });
  });

  describe('#statement', function() {
    beforeEach(function() {
      sinon.stub(event, 'toString').returns('string');
      for (var counter = 0; counter < 5; counter++) {
        bank.events.push(event);
      };
    });

    describe('when printing statements', function() {
      var head;
      var body;

      beforeEach(function() {
        var statement = bank.statement();
        body = statement.split('\n');
        head = body.shift();
      });

      it('creates header row', function() {
        expect(head).to.equal('date || credit || debit || balance');
      });

      it('converts each event to string', function() {
        expect(body[0]).to.equal('string');
      });

      it('has correct number of rows', function() {
        expect(body).to.have.lengthOf(5);
      });
    });
  });
});
