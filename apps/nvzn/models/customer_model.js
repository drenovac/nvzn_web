// ==========================================================================
// Project:   Roster.Customer
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Roster */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Roster.Customer = SC.Record.extend(
/** @scope Roster.Customer.prototype */ {

  name: SC.Record.attr('String'),

//  employees: function() {
//    // Return a record array of all employees of this customer
//    return this.get('store').find(
//      SC.Query.local('Roster.Employee', "employer = %@", [this])
//    );
//  }.property().cacheable()

  employees: SC.Record.toMany('Roster.Employee', {nested: YES})

}) ;
