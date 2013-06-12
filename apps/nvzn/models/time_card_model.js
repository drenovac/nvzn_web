// ==========================================================================
// Project:   Nvzn.TimeCard
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

//Nvzn.ICON_SO = sc_static("image/icons/SO.png");

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
  type: SC.Record.attr('String'),
  desc: SC.Record.attr('String'),

  timeDisplay: function() {
    var start = this.timeFromString('start'),
        end   = this.timeFromString('finish');
    return start+"-"+end ;
  }.property('start','finish'),

  dateObject: function() {
    return SC.DateTime.parse(
      this.get('date')+" "+this.get('start'), "%Y-%m-%d %H:%M:%S"
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
    var split = this.get(prop).split(':');
    split.pop();
    return split.join(':');
  }

}) ;

Nvzn.TimeCard.fieldFormatter = function(items) {
  if (!items) return "";
  var ret = "", classes = "timecard-cell ", allClasses,
    status, approveClass = 'approve', cid, approveClasses,
    sent = Nvzn.local.getPath('sent'), desc;
  if (Nvzn.canEditManager) classes = "editable-cell "+classes;
  var color = Nvzn.get('showTimeCardColors');
  items.forEach(function(item) {
    status = item.get('status');
    approveClasses = approveClass;
    if (status & SC.Record.DIRTY) approveClasses += ' changed';
    if (sent && sent[item.get('id')]) approveClasses += " submitted";
    if (item.get('approved')) approveClasses += ' approved';
    if (Nvzn.canApproveManager) {
      ret += "<span class='"+ approveClasses+"' storeKey='"+item.get('storeKey')+"'> </span>";
    }
    if (color) {
      cid = item.getPath('customer');
      ret += "<span class='customer-color' title='"+cid+"' style='background-color:"+Nvzn.colorFor(cid)+";'>";
    }
//    console.log("Rendering cell", item.get('storeKey'), item.statusString());
    allClasses = classes + (items.get('status') & SC.Record.DIRTY ? "cell-dirty" : "");
    ret += "<span id='tc-s-"+item.get('storeKey')+"' class='"+allClasses+"'>"
      +item.timeFromString('start') + "</span> - "; // ensure `-` is outside span for editing.

//    icon = Nvzn.icon_for(item.get('type'));
//    if(icon !== SC.BLANK_IMAGE_URL) {
//      ret+="<img class='tc_icon' src='"+ Nvzn.icon_for(item.get('type'))+"' title='"+item.get('desc')+"' >";
//    } else {
//      ret +="&nbsp;-&nbsp;";
//    }

    ret += "<span id='tc-f-"+item.get('storeKey')+"' class='"+allClasses+"'>"
      +item.timeFromString('finish')
      +"</span><br>"
    ;
    desc = item.get('desc');
    if (item.get('type') !== "N" && desc !== null) {
      ret += "<span class='tc_desc' title='%@'>%@</span></br>".fmt(desc, desc);
    }
    if (color) ret += "</span>";
  });
  return ret;
};

