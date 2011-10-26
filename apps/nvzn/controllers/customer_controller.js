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

  isCustomerController: YES,

  contentBinding: SC.Binding.single('Nvzn.customersController.selection')

}) ;
