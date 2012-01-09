// ==========================================================================
// Project:   Nvzn.customersController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Nvzn.customersController = SC.ArrayController.create(
/** @scope Nvzn.customersController.prototype */ {

  contentBinding: 'Nvzn.loginController.customers',
  allowsEmptySelection: NO,
  allowsMultipleSelection: YES,

  selectionDidChange: function() {
    Nvzn.statechart.sendEvent('customerSelectionChanged');
  }.observes('selection')

}) ;
