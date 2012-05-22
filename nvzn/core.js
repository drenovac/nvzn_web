// ==========================================================================
// Project:   Nvzn
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

var YES = true, NO = false;
/** @namespace

 My cool new app.  Describe your application.

 @extends SC.Object
 */
SC.Application.create();

Nvzn = global.Nvzn = SC.Object.create(
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

Nvzn.start = function() {
    Nvzn.statechart.initStatechart();
};
Nvzn.imageLoaded = function(name) {
  if (!Nvzn.ready) {
    console.log('image "%@" loaded, but apps not ready.'.fmt(name));
    return;
  }
  if (Nvzn.loadingImages === 0){
    console.log('image "%@" loaded, Last one, lets go.'.fmt(name));
    SC.run(function(){ Nvzn.start() });
//    Nvzn.start();
  } else {
    console.log('image "%@" loaded, Still %@ more to come.'.fmt(name, Nvzn.loadingImages));
  }
};

Nvzn.images = {};
Nvzn.loadingImages = 0;
Nvzn.loadImage = function(name, url) {
  Nvzn.loadingImages += 1;
  var img = new Image();
  img.onload = function() {
    Nvzn.loadingImages -= 1;
    Nvzn.images[name] = img;
    Nvzn.imageLoaded(name);
  }
  img.src = url;
};

SC.ready(function(){
  Nvzn.loadImage('logo', '/static/envizion-logo.png');
  Nvzn.loadImage('paper1', '/static/paper1.png');
  Nvzn.loadImage('paper2', '/static/paper2.png');
});
