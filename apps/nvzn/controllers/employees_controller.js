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

  allowsEmptySelection: NO


}) ;
