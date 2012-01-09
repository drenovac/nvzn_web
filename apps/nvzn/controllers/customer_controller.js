// ==========================================================================
// Project:   Nvzn.customerController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Nvzn.customerController = SC.ObjectController.create(
/** @scope Nvzn.customerController.prototype */ {

  isCustomerController: YES

//  selectionBinding: 'Nvzn.customersController.selection',

//  selectionDidChange: function() {
//    var customerId = this.get('selection'),
//        customer = Nvzn.store.find(Nvzn.Customer, customerId);
////    debugger;
//    console.log(customerId);
//    console.log(Nvzn.customerController.get('selection'));
//    if (customer) {
//      this.set('content', customer);
//    } else {
//      this.set('content', null);
//      Nvzn.getSiteData(customerId);
//    }
//  }.observes('selection')

}) ;
