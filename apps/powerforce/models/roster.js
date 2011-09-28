// ==========================================================================
// Project:   Powerforce.Roster
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Powerforce */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Powerforce.Roster = SC.Record.extend(
/** @scope Powerforce.Roster.prototype */ {

  // TODO: Add your own code here.

  employee: SC.Record.attr(String, { isRequired: YES }),
  contact: SC.Record.attr(String),
  site_phone: SC.Record.attr(String),
  location: SC.Record.attr(String),
  status: SC.Record.attr(String, { defaultValue: "pending" }),
  start: SC.Record.attr(SC.DateTime, { format: '%d/%m/%Y %H:%M:%S' }),
  end: SC.Record.attr(SC.DateTime, { format: '%d/%m/%Y %H:%M:%S' }),
  
  date: function(){
    var start = this.get('start');
    var date = start.toFormattedString("%d/%b/%Y");
    return date;
  }.property('start').cacheable(),
  
  shift: function(){
    var start = this.get('start');
    var end = this.get('end');
    start = start.toFormattedString("%I:%M%p");
    end = end.toFormattedString("%I:%M%p");
    var shift = start + " ~ " + end;
    return shift;
  }.property('start', 'end').cacheable()
  
}) ;
