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
  contactNumbers: SC.Record.attr('Array', {key: 'contact_numbers' }),
  address: SC.Record.attr('String'),
  photoPath: SC.Record.attr('String', {key: 'photo_path'}),

  fullName: function() {
    return [this.get('firstName'), this.get('lastName')].join(" ").titleize();
  }.property('firstName', 'lastName').cacheable(),

//  timeCards: function() {
//    // Return a record array of all timecards of this employee
//    return this.get('store').find(
//      SC.Query.local('Nvzn.TimeCard', "employee = %@", [this])
//    );
//  }.property().cacheable()

  timeCards: SC.Record.toMany('Nvzn.TimeCard', {nested: YES})

}) ;
