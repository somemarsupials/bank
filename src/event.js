'use strict';

function Event(amount, total, date) {
  this.amount = Math.abs(amount);
  this.total = total;
  this.date = date;
};

Event.prototype.dateString = function() {
  return this.date.toDateString();
};

function asDeposit(event) {
  event.toString = function() {
    return `${this.dateString()} || ${this.amount} || || ${this.total}`;
  };
  return event;
};

function asWithdrawal(event) {
  event.toString = function() {
    return `${this.dateString()} || || ${this.amount} || ${this.total}`;
  };
  return event;
};

function eventFactory(amount, total, date) {
  var converter = amount < 0 ? asWithdrawal : asDeposit;
  return converter(new Event(amount, total, date));
};

module.exports.eventFactory = eventFactory;
