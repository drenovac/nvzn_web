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
  VERSION: '20120917-0-gb7244ae-52',


  /*
   * Permissions
   */
  canEditManager: NO,
  canApproveManager: NO,


  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures),

  local: SC.UserDefaults.create({ appDomain: "Nvzn" }),
  
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

  startOfWeek: function() {
    return Nvzn.startOfWeekFor(this.get('selectedDate'));
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
  }.property('mode'),

  formatTime: function(str) {
    str = str.trim();
    var split = str.split(":");
    if (split.length <= 2) split.push("00"); // we might have only minutes and hours
    if (split.length <= 2) split.push("00"); // we will have had only the hour
    if (split[0].length < 2) split[0] = "0"+split[0];
    if (split[1].length < 2) split[1] = split[1]+"0";
    return split.join(":");
  },

  colors: {},
  nextH: 30,
  nextL: 50,
  nextS: 50,
  colorFor: function(id) {
    var color = this.colors[id];
    if (color) return color;
    var h = this.nextH, s = this.nextS, l = this.nextL;
    color=this.colors[id]="hsl(%@,%@%,%@%)".fmt(h,s,l);
    h = this.nextH += 50;
    if (h > 360) {
      // start the h loop again, with an overset
      this.nextH = h - 360;
      // then start the next set of colors.
      if (l == 30) { // vibrant
        this.nextL = 50;
        this.nextS = 50;
      } else if( l == 50 ) { // dark
        this.nextL = 70;
        this.nextS = 30;
      } else { // light
        this.nextL = 30;
        this.nextS = 70;
      }
    }

    return color;
  }

}) ;

