// ==========================================================================
// Project:   Roster.timeCardsController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Roster */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Roster.timeCardsController = SC.ArrayController.create(
/** @scope Roster.timeCardsController.prototype */ {

  contentBinding: 'Roster*employeeController.timeCards'

}) ;
