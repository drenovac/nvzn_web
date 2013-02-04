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

  primaryKey: 'id',
  // Alias for id
  customer: function() {
    return this.get('id');
  }.property('id').cacheable(),

  name: SC.Record.attr('String'),

  displayName: function() {
    return this.get('id');
  }.property('name').cacheable(),

  displayClass: function() {
    return 'customer';
  }.property().cacheable(),

  fullName: function() {
    return this.get('displayName')+" - "+this.get('fullAddress');
  }.property('displayName', 'fullAddress'),

  fullAddress: function() {
    var address = this.get('address');
    if (!address) address = {};
    if (SC.empty(address.name))   address.name   = "The Building"
    if (SC.empty(address.street)) address.street = "1 Some Place";
    if (SC.empty(address.suburb)) address.suburb = "That Town";
    //return "1 South Street, South Kempsey 2440";
    return address.name + " "+address.street + ", "+address.suburb+" "+address.postcode;
  }.property('address').cacheable(),

//  employees: function() {
//    // Return a record array of all employees of this customer
//    return this.get('store').find(
//      SC.Query.local('Nvzn.Employee', "employer = %@", [this])
//    );
//  }.property().cacheable()

//  employees: SC.Record.toMany('Nvzn.Employee', {nested: YES})
  employees: SC.Record.toMany('Nvzn.Employee'),

  displayColor: null

}) ;
