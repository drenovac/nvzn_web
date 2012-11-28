// ==========================================================================
// Project:   Nvzn.employeesController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Nvzn.employeesController = SC.ArrayController.create(
/** @scope Nvzn.employeesController.prototype */ {

  contentBinding: 'Nvzn.customerController.employees',

  allowsEmptySelection: NO,

  arrangedObjects: function() {
    var customerId = null, customer,
      employees = this.get('content'),
      site, storeKey,
      S = Nvzn.store, C = Nvzn.Customer,
      ret = [];
    if (!employees) return ret;
    employees.forEach(function(employee) {
      site = employee.get('customer');
      if (site !== customerId) {
        // Insert Site row
        // store.find doesn't work just yet
        storeKey = C.storeKeyFor(site);
        customer = S.materializeRecord(storeKey);
        ret.push(customer);
        customerId = site;
      }
      ret.push(employee);
    });
    return ret;
  }.property('content').cacheable()

}) ;
