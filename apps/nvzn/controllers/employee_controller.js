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

    // Content left blank, this is the Employee mode rootController

//    timeCardsBinding: '.content.timeCards',
    weekEndingBinding: 'Nvzn.weekEnding',
    weekEnding: null,

    customerTimecards:function () {
      var cardsBySite = {}, sunday, customer, date, ms,
          tcs = this.get('timeCards'),
          sites = SC.Set.create();
      if(!tcs) return [];

      if (!sunday) sunday = Nvzn.get('weekEnding').adjust({hour:23, minute:59, second:59});
      var monday = sunday.get('lastMonday').adjust({hour:0, minute:0});

      tcs.forEach(function (tc) {
        date = tc.get('dateObject');
        ms = date.get('milliseconds');
        if (ms >= monday.get('milliseconds') && ms <= sunday.get('milliseconds')) {
          // TimeCard is valid, do your thing.
          customer = tc.get('customer');
          sites.add(customer);
          if(!cardsBySite[customer]) {
            cardsBySite[customer] = {
              id: customer,
              1:"", // Monday
              2:"",
              3:"",
              4:"",
              5:"",
              6:"",
              0:""  // Sunday
            };
          }
          cardsBySite[customer][date.get('dayOfWeek')] += tc.get('timeDisplay') + " ";
        }
      });

      return sites.map(function(site){
        return SC.Object.create(cardsBySite[site]);
      });
    }.property('timeCards', 'weekEnding').cacheable()

}) ;
