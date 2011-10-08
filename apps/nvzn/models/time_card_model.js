// ==========================================================================
// Project:   Roster.TimeCard
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Roster */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Roster.TimeCard = SC.Record.extend(
/** @scope Roster.TimeCard.prototype */ {

//  employee:  SC.Record.toOne('Roster.Employee'),

  date: SC.Record.attr('String'),
  start: SC.Record.attr('String'),
  finish: SC.Record.attr('String'),

  timeDisplay: function() {
    return this.get('start').split(" ")[1]+"-"+ this.get('finish').split(" ")[1];
  }.property('start','finish'),

  dateObject: function() {
    return SC.DateTime.parse(
      this.get('date')+" "+this.get('start').split(" ")[1],
      "%Y-%m-%d %H:%M:%S"
    );
  }.property('date').cacheable(),

  year: function() {
    return this.get('dateObject').get('year');
  }.property('dateObject'),

  week: function() {
    return this.get('dateObject').get('week');
  }.property('dateObject')

}) ;
