// ==========================================================================
// Project:   Nvzn.TimeCard
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Nvzn.TimeCard = SC.Record.extend(
/** @scope Nvzn.TimeCard.prototype */ {

//  employee:  SC.Record.toOne('Nvzn.Employee'),

  date: SC.Record.attr('String'),
  start: SC.Record.attr('String'),
  finish: SC.Record.attr('String'),
  customer: SC.Record.attr('String'),

  timeDisplay: function() {
    var start = this.timeFromString('start'),
        end   = this.timeFromString('finish');
    return start+"-"+end ;
  }.property('start','finish'),

  dateObject: function() {
    return SC.DateTime.parse(
      this.get('date')+" "+this.get('start').split(" ")[1],
      "%Y-%m-%d %H:%M:%S"
    );
  }.property('date').cacheable(),

  dateString: function() {
    return this.get('dateObject').toFormattedString("%Y-%m-%d")
  }.property('date').cacheable(),

  year: function() {
    return this.get('dateObject').get('year');
  }.property('dateObject'),

  week: function() {
    return this.get('dateObject').get('week');
  }.property('dateObject'),

  // Helper functions
  timeFromString: function(prop) {
    var split = this.get(prop).split(" ");
    if (split.length == 1) return "00:00";
    split = split[1].split(':');
    split.pop();
    return split.join(':');
  }

}) ;
