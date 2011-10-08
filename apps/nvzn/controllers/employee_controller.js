// ==========================================================================
// Project:   Roster.employeeController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Roster */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Roster.employeeController = SC.ObjectController.create(
/** @scope Roster.employeeController.prototype */ {

  contentBinding: SC.Binding.single('Roster.employeesController.selection')

}) ;
