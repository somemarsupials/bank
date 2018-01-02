'use strict';

var bank = require('./bank.js');


function BankCLI(bank = new bank.Bank()) {
  this.bank = bank;
};

BankCLI.prototype.command = function(command) {
  var inputs = command.replace(/\s+/g, ' ').split(' ');
  var operation = inputs.shift();
  var args = this._toIntegers(inputs);
  this.operation(operation, ...args);
};

BankCLI.prototype.operation = function(operation, ...args) {
  switch (operation) {
    case 'withdraw':
      this.withdraw(...args);
      return;
    case 'deposit':
      this.deposit(...args);
      return;
    case 'statement':
      this.statement();
      return;
  };
  this.error();
};

BankCLI.prototype.print = function(message) {
  console.log(message);
};

BankCLI.prototype.statement = function() {
  this.print(this.bank.statement())
};

BankCLI.prototype.error = function() {
  this.print('unknown command\nusage: deposit | withdraw | statement');
};

BankCLI.prototype.withdraw = function(amount) {
  this.bank.withdraw(amount);
  this.print(`Withdrawn £${amount}`);
};

BankCLI.prototype.deposit = function(amount) {
  this.bank.deposit(amount);
  this.print(`Deposited £${amount}`);
};

BankCLI.prototype._toIntegers = function(array) {
  return array.map(this._toInt);
};

BankCLI.prototype._toInt = function(number) {
  if (number.match(/^\d+$/)) {
    return parseInt(number);
  } else {
    throw new Error('invalid numerical input');
  };
}

module.exports.BankCLI = BankCLI;
