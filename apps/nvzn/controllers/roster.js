// ==========================================================================
// Project:   Nvzn.rosterController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Nvzn.rosterController = SC.ArrayController.create(
/** @scope Nvzn.rosterController.prototype */ {

  loading: NO

//  content: [],
//
//  dependantsDidChange: function() {
//    console.log('week or customer changed ...');
//    var dateStr = "%Y-%m-%d",
//        sunday = Nvzn.get('weekEnding').adjust({hour:23, minute:59, second:59}),
//        monday = sunday.get('lastMonday').adjust({hour:0, minute:0}),
//        customer = Nvzn.customerController.get('id'),
//        query = SC.Query.local( Nvzn.TimeCard,
//          "customer = {customer} AND date >= {start} AND date <= {finish}",
//          {start: monday.toFormattedString(dateStr), finish: sunday.toFormattedString(dateStr), customer: customer}
//        ),
//        timesheets = Nvzn.store.find(query),
//        ret = [], eObj,
//        employees = Nvzn.customerController.get('employees');
//
//    if (!employees) { // no customer Yet (or empty employees)
//      this.set('content', ret);
//      return;
//    }
//    employees.forEach(function(emp) {
//      console.log("Createing Row", emp, emp.get('storeKey'));
//      eObj = SC.Object.create({
//        fullName: emp.get('fullName'),
//        1:[], // Monday
//        2:[],
//        3:[],
//        4:[],
//        5:[],
//        6:[],
//        0:[]  // Sunday
//      });
//
//      ret.push(eObj);
//    });
//
//    this.set('content', ret);
//  }.observes('week', 'customer'),
//
//  weekBinding: 'Nvzn.selectedWeek',
//  customerBinding: 'Nvzn.customerController.id'

}) ;
