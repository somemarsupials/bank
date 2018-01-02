'use strict';

var eventFactory = require('../src/event.js').eventFactory;
var sinon = require('sinon');
var expect = require('chai').expect;

describe('eventFactory', function() {
  var event;
  var date;

  beforeEach(function() {
    date = sinon.spy();
    date.toDateString = function() {};
    event = eventFactory(100, 200, date);
  });

  describe('#new', function() {
    describe('when creating withdrawal', function() {
      it('has same amount', function() {
        expect(event.amount).to.equal(100);
      });
    });
    
    describe('when creating withdrawal', function() {
      beforeEach(function() {
        event = eventFactory(-100, 200, date);
      });

      it('has absolute amount', function() {
        expect(event.amount).to.equal(100);
      });
    });

    describe('in all cases', function() {
      it('has total', function() {
        expect(event.total).to.equal(200);
      });

      it('has date', function() {
        expect(event.date).to.equal(date);
      });
    });
  });

  describe('dateString', function() {
    describe('when generating date as string', function() {
      beforeEach(function() {
        sinon.stub(date, 'toDateString').returns('date');
      });

      it('calls date #toDateString', function() {
        expect(event.dateString()).to.equal('date');
      });
    });
  });

  describe('toString', function() {
    beforeEach(function() {
      sinon.stub(event, 'dateString').returns('date');
    });

    describe('for a deposit event', function() {
      it('generates record with credit', function() {
        expect(event.toString()).to.equal('date || 100 || || 200');
      });
    });

    describe('for a deposit event', function() {
      beforeEach(function() {
        event = eventFactory(-100, 200, date);
        sinon.stub(event, 'dateString').returns('date');
      });

      it('generates record with credit', function() {
        expect(event.toString()).to.equal('date || || 100 || 200');
      });
    });
  });
});


