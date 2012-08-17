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

  primaryKey: 'id',
  date: SC.Record.attr('String'),
  start: SC.Record.attr('String'),
  finish: SC.Record.attr('String'),
  customer: SC.Record.attr('String'),
  employee: SC.Record.toOne('Nvzn.Employee'),

  timeDisplay: function() {
    var start = this.timeFromString('start'),
        end   = this.timeFromString('finish');
    return start+"-"+end ;
  }.property('start','finish'),

  dateObject: function() {
    return SC.DateTime.parse(
      this.get('date')+" "+this.get('start'),
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
//    return this.get(prop);
//    var split = this.get(prop).split(" ");
//    if (split.length == 1) return "00:00";
    split = this.get(prop).split(':');
    split.pop();
    return split.join(':');
  }

}) ;

Nvzn.TimeCard.fieldFormatter = function(items) {
  var ret = "", classes = "editable-cell timecard-cell ", allClasses,
    status, approveClass = 'approve',
    sent = Nvzn.local.getPath('sent');
  items.forEach(function(item) {
    status = item.get('status');
    if (status & SC.Record.DIRTY) approveClass += ' changed';
    if (sent && sent[item.get('id')]) approveClass += " submitted";
    if (item.get('approved')) approveClass += ' approved';
    ret += "<span class='"+approveClass+"' storeKey='"+item.get('storeKey')+"'> </span>";
//    console.log("Rendering cell", item.get('storeKey'), item.statusString());
    allClasses = classes + (items.get('status') & SC.Record.DIRTY ? "cell-dirty" : "");
    ret += "<span id='tc-s-"+item.get('storeKey')+"' class='"+allClasses+"'>"
      +item.timeFromString('start')
      +"</span>&nbsp;-&nbsp;";

    ret += "<span id='tc-f-"+item.get('storeKey')+"' class='"+allClasses+"'>"
      +item.timeFromString('finish')
      +"</span><br>"
    ;
  });
  return ret;
};

