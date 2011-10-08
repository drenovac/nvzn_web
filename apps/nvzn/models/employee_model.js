// ==========================================================================
// Project:   Nvzn.Employee
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Nvzn.Employee = SC.Record.extend(
/** @scope Nvzn.Employee.prototype */ {

  primaryKey: 'id',
  firstName: SC.Record.attr('String', {key: 'first_name'}),
  lastName:  SC.Record.attr('String', {key: 'last_name' }),
//  employer:  SC.Record.toOne('Nvzn.Customer'),

  fullName: function() {
    return [this.get('firstName'), this.get('lastName')].join(" ");
  }.property('firstName', 'lastName').cacheable(),

//  timeCards: function() {
//    // Return a record array of all timecards of this employee
//    return this.get('store').find(
//      SC.Query.local('Nvzn.TimeCard', "employee = %@", [this])
//    );
//  }.property().cacheable()

  timeCards: SC.Record.toMany('Nvzn.TimeCard', {nested: YES})

}) ;
