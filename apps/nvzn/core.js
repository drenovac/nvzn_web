// ==========================================================================
// Project:   Nvzn
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
Nvzn = SC.Application.create(
  /** @scope Nvzn.prototype */ {

  NAMESPACE: 'Nvzn',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures),
  
  rosterContent: null,

  selectedRecord: null,

//  selectedDate: SC.DateTime.create(),
  selectedDate:SC.DateTime.create({ year:2010, month:10, day:31 }),

  selectedWeekDidChange: function() {
    if (Nvzn.didChangeFor('core', 'selectedWeek')) {
//      console.log('selectedWeek', this.get('selectedWeek'));
      Nvzn.statechart.sendEvent('selectedNewDay');
    }
  }.observes('selectedWeek').cacheable(),

  weekEnding: function() {
     return Nvzn.weekEndingFor(this.get('selectedDate'));
  }.property('selectedDate').cacheable(),

  selectedWeek: function() {
    var date = this.get('selectedDate');
    return date.get('week1');
  }.property('selectedDate').cacheable(),

  mode: 'none',
  isSite: function() {
    return this.get('mode') === 'site';
  }.property('mode'),

  isEmployee:function () {
    return this.get('mode') === 'employee';
  }.property('mode')

}) ;

