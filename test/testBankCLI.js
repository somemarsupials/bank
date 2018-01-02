'use strict';

var BankCLI = require('../src/bankCLI').BankCLI;
var expect = require('chai').expect;
var sinon = require('sinon');


describe('BankCLI', function() {
  var cli;
  var bank;

  beforeEach(function() {
    bank = sinon.stub();
    cli = new BankCLI(bank);
  });

  describe('#new', function() {
    it('has Bank object', function() {
      expect(cli.bank).to.equal(bank);
    });
  });

  describe('#_toInt', function() {
    describe('when given valid integer', function() {
      it('converts to int and returns', function() {
        expect(cli._toInt('4')).to.equal(4);
      });
    });

    describe('when given invalid integer', function() {
      it('throws error', function() {
        expect(function() { cli._toInt('3a') }).to.throw(Error);
      });
    });
  });

  describe('#_toIntegers', function() {
    var array;
    
    beforeEach(function() {
      array = sinon.spy();
      array.map = sinon.spy();
      cli._toIntegers(array);
    });

    describe('when given array', function() {
      it('applies #_toInt to each element', function() {
        expect(array.map.calledWith(cli._toInt)).to.be.true;
      });
    });
  });

  describe('#withdraw', function() {
    beforeEach(function() {
      cli.bank.withdraw = sinon.spy();
      sinon.stub(cli, 'print');
      cli.withdraw(500);
    });

    it('calls bank #withdraw', function() {
      expect(cli.bank.withdraw.calledWith(500)).to.be.true;
    });

    it('prints message', function() {
      expect(cli.print.calledWith('Withdrawn £500')).to.be.true;
    });
  });

  describe('#deposit', function() {
    beforeEach(function() {
      cli.bank.deposit = sinon.spy();
      sinon.stub(cli, 'print');
      cli.deposit(500);
    });

    it('calls bank #deposit', function() {
      expect(cli.bank.deposit.calledWith(500)).to.be.true;
    });

    it('prints message', function() {
      expect(cli.print.calledWith('Deposited £500')).to.be.true;
    });
  });

  describe('#statement', function() {
    beforeEach(function() {
      cli.bank.statement = sinon.stub().returns('statement');
      sinon.stub(cli, 'print');
      cli.statement();
    });

    it('calls bank #statement', function() {
      expect(cli.bank.statement.calledOnce).to.be.true;
    });

    it('prints message', function() {
      expect(cli.print.calledWith('statement')).to.be.true;
    });
  });

  describe('#error', function() {
    var msg;

    beforeEach(function() {
      sinon.stub(cli, 'print');
      cli.error();
      msg = 'unknown command\nusage: deposit | withdraw | statement';
    });

    it('prints message', function() {
      expect(cli.print.calledWith(msg)).to.be.true;
    });
  });

  describe('#print', function() {
    beforeEach(function() {
      sinon.stub(console, 'log').callThrough();
      cli.print('hello');
    });

    it('passes message to stdout', function() {
      expect(console.log.calledWith('hello')).to.be.true;
    });
  });

  describe('#operation', function() {
    describe('when receiving withdraw', function() {
      beforeEach(function() {
        cli.withdraw = sinon.spy();
        cli.operation('withdraw', 500);
      });

      it('calls #withdraw', function() {
        expect(cli.withdraw.calledWith(500)).to.be.true;
      });
    });

    describe('when receiving deposit', function() {
      beforeEach(function() {
        cli.deposit = sinon.spy();
        cli.operation('deposit', 500);
      });

      it('calls #deposit', function() {
        expect(cli.deposit.calledWith(500)).to.be.true;
      });
    });

    describe('when receiving statement', function() {
      beforeEach(function() {
        cli.statement = sinon.spy();
        cli.operation('statement');
      });

      it('calls #statement', function() {
        expect(cli.statement.calledOnce).to.be.true;
      });
    });

    describe('when receiving unknown', function() {
      beforeEach(function() {
        cli.error = sinon.spy();
        cli.operation('nonsense');
      });

      it('calls #error', function() {
        expect(cli.error.calledOnce).to.be.true;
      });
    });
  });

  describe('command', function() {
    beforeEach(function() {
      cli.operation = sinon.spy();
      cli.command('hello 500 600');
    });

    describe('when processing command', function() {
      it('calls operation with operator and parsed args', function() {
        expect(cli.operation.calledWith('hello', 500, 600)).to.be.true;
      });
    });
  });
});
