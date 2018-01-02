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
        sinon.stub(bank, '_newTotal').returns(100);
        sinon.stub(bank, '_newEvent');
      });

      describe('when calculating new total', function() {
        beforeEach(function() {
          bank.deposit(100)
        });

        it('calls _newTotal', function() {
          expect(bank._newTotal.calledWith(100, true)).to.be.true;
        });
      });

      describe('when creating new event', function() {
        beforeEach(function() {
          bank.total = 400;
          bank.deposit(100)
        });

        it('calls _newEvent', function() {
          expect(bank._newEvent.calledWith(100, 400)).to.be.true;
        });
      });
    });
  });

  describe('#withdraw', function() {
    describe('when depositing an amount', function() {
      beforeEach(function() {
        sinon.stub(bank, '_newTotal').returns(-100);
        sinon.stub(bank, '_newEvent');
      });

      describe('when calculating new total', function() {
        beforeEach(function() {
          bank.withdraw(100)
        });

        it('calls _newTotal', function() {
          expect(bank._newTotal.calledWith(100, false)).to.be.true;
        });
      });

      describe('when creating new event', function() {
        beforeEach(function() {
          bank.total = 400;
          bank.withdraw(100)
        });

        it('calls _newEvent', function() {
          expect(bank._newEvent.calledWith(-100, 400)).to.be.true;
        });
      });
    });
  });

  describe('#_newTotal', function() {
    var newTotal;
    
    describe('when depositing', function() {
      beforeEach(function() {
        newTotal = bank._newTotal(100, true);
      });

      it('adds amount to total', function() {
        expect(bank.total).to.equal(100);
      });

      it('returns new total', function() {
        expect(newTotal).to.equal(100);
      });
    });

    describe('when withdrawing', function() {
      beforeEach(function() {
        newTotal = bank._newTotal(100, false);
      });

      it('adds amount to total', function() {
        expect(bank.total).to.equal(-100);
      });

      it('returns new total', function() {
        expect(newTotal).to.equal(-100);
      });
    });
  });

  describe('#_newEvent', function() {
    beforeEach(function() {
      eventConstructor.returns(event);
    });

    beforeEach(function() {
      bank._newEvent(100, 200);
    });

    it('creates event object with value and deposit', function() {
      expect(eventConstructor.calledWith(100, 200)).to.be.true;
    });

    it('collects new event in event log', function() {
      expect(bank.events).to.contain(event)
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
