// ==========================================================================
// Project:   Nvzn.Customer
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Nvzn.Customer = SC.Record.extend(
/** @scope Nvzn.Customer.prototype */ {

  primaryKey: 'name',
  name: SC.Record.attr('String'),


  displayName: function() {
    return this.get('name');
  }.property('name'),

//  employees: function() {
//    // Return a record array of all employees of this customer
//    return this.get('store').find(
//      SC.Query.local('Nvzn.Employee', "employer = %@", [this])
//    );
//  }.property().cacheable()

  employees: SC.Record.toMany('Nvzn.Employee', {nested: YES})

}) ;
