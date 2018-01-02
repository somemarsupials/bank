'use strict';

event = require('event');

function Bank(eventConstructor = event.eventFactory) {
  this.total = 0;
  this.events = [];
  this._eventConstructor = eventConstructor;
};

module.exports.Bank = Bank;
