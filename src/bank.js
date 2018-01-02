'use strict';

var event = require('./event');

function Bank(eventConstructor = event.eventFactory) {
  this.total = 0;
  this.events = [];
  this._eventConstructor = eventConstructor;
};

Bank.prototype.deposit = function(amount) {
  this.total += this._newEvent(amount, true);
};

Bank.prototype.withdraw = function(amount) {
  this.total += this._newEvent(amount, false);
};

Bank.prototype._newEvent = function(amount, deposit) {
  amount *= deposit ? 1 : -1;
  this.events.push(this._eventConstructor(amount));
  return amount;
};

module.exports.Bank = Bank;
