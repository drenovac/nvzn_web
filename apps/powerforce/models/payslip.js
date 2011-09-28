// ==========================================================================
// Project:   Powerforce.Payslip
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Powerforce */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Powerforce.Payslip = SC.Record.extend(
/** @scope Powerforce.Payslip.prototype */ {

  employee: SC.Record.attr(String),
  from: SC.Record.attr(String),
  to: SC.Record.attr(String),
  paidAt: SC.Record.attr(String),
  tax: SC.Record.attr(String),
  'super': SC.Record.attr(String),
  gross: SC.Record.attr(String),
  rate: SC.Record.attr(String),
  hour: SC.Record.attr(String),

  toString: function() {
    return '%@ ~ %@'.fmt(this.get('from'), this.get('to'));
  }.property()

}) ;
