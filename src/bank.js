'use strict';

var event = require('./event');

function Bank(eventConstructor = event.eventFactory) {
  this.total = 0;
  this.events = [];
  this._eventConstructor = eventConstructor;
};

Bank.prototype.deposit = function(amount) {
  var amount = this._newTotal(amount, true);
  this._newEvent(amount, this.total);
};

Bank.prototype.withdraw = function(amount) {
  var amount = this._newTotal(amount, false);
  this._newEvent(amount, this.total);
};

Bank.prototype.statement = function() {
  var lines = ['date || credit || debit || balance'];
  for (var counter = 0; counter < this.events.length; counter++) {
    lines.push(this.events[counter].toString());
  };
  return lines.join('\n');
};

Bank.prototype._newTotal = function(amount, deposit) {
  amount *= (deposit ? 1 : -1);
  this.total += amount;
  return amount;
};

Bank.prototype._newEvent = function(amount, total) {
  this.events.push(this._eventConstructor(amount, total));
};

module.exports.Bank = Bank;
