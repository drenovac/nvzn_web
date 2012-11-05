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
    weeksToShow: 4,
    startOfWeekBinding: 'Nvzn.startOfWeek',

    timeCardsDidChange: function() {
      console.log('TimeCards or startOfWeek did change');

      var timecards = this.get('timeCards'),
        weeksToShow = this.get('weeksToShow'),
        startOfWeek = this.get('startOfWeek'),
        daysToShow = 7 * weeksToShow, i, days = [];
      if (!timecards) return;

      // Build Object for Each Day
      for(i = 0; i < daysToShow; i++) {
        var day = startOfWeek.advance({day:i});
        days.push({
          date: day,
          timecards: timecards.filter(function(timecard){
            return SC.DateTime.compareDate(day, timecard.get('dateObject')) === 0
          })
        });
      }

      console.log("TimeCards:");
//      timecards.forEach(function(timecard) {
//        console.log(timecard.get('attributes'));
//      });

      this.set('content', days);

    }.observes('timeCards', 'startOfWeek', 'weeksToShow')

});