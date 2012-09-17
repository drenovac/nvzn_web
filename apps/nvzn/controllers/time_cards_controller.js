// ==========================================================================
// Project:   Nvzn.timeCardsController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Nvzn.timeCardsController = SC.ArrayController.create(
/** @scope Nvzn.timeCardsController.prototype */ {

  contentBinding: 'Nvzn.employeeController.timeCards'

}) ;



Nvzn.timeCardsByWeekController = SC.ArrayController.create(
/** @scope Nvzn.timeCardsController.prototype */ {

    timeCardsBinding: 'Nvzn.employeeController.timeCards',
    weeksToShow: 2,
    startOfWeekBinding: 'Nvzn.startOfWeek',

    timeCardsDidChange: function() {
      console.log('TimeCards or startOfWeek did change')

      var timecards = this.get('timeCards'),
        weeksToShow = this.get('weeksToShow'),
        daysToShow = 7 * weeksToShow;



    }.observes('timeCards', 'startOfWeek', 'weeksToShow')

});