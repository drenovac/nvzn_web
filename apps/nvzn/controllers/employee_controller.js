// ==========================================================================
// Project:   Nvzn.employeeController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Nvzn.employeeController = SC.ObjectController.create(
/** @scope Nvzn.employeeController.prototype */ {

  contentBinding: SC.Binding.single('Nvzn.employeesController.selection')

}) ;
