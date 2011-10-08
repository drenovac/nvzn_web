// ==========================================================================
// Project:   Roster.employeesController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Roster */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Roster.employeesController = SC.ArrayController.create(
/** @scope Roster.employeesController.prototype */ {

  contentBinding: 'Roster.customerController.employees',

  allowsEmptySelection: NO

}) ;
