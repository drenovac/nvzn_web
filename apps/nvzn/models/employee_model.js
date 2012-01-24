// ==========================================================================
// Project:   Nvzn.Employee
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Nvzn.Employee = SC.Record.extend(
/** @scope Nvzn.Employee.prototype */ {

  primaryKey: 'id',
  firstName: SC.Record.attr('String', {key: 'first_name'}),
  lastName:  SC.Record.attr('String', {key: 'last_name' }),
  contactNumbers: SC.Record.attr('Array', {key: 'contact_numbers' }),
  address: SC.Record.attr('String'),
  photoPath: SC.Record.attr('String', {key: 'photo_path'}),

  timeCards: SC.Record.toMany('Nvzn.TimeCard', {nested: YES}),

  fullName: function() {
    return [this.get('firstName'), this.get('lastName')].join(" ").titleize();
  }.property('firstName', 'lastName').cacheable(),

  timeCardsByDate: function(sunday) {
    if (this._timeCardsBuDate) return this._timeCardsByDate;
    // EVIL!!!! WHAT BETTER WAY IS THERE?!?!?!
    if (!sunday) sunday = Nvzn.get('weekEnding').adjust({hour:23, minute:59, second:59});
    var monday = sunday.get('lastMonday').adjust({hour:0, minute:0}), date, timecards,ms,
    hash = {
      1:"", // Monday
      2:"",
      3:"",
      4:"",
      5:"",
      6:"",
      0:""  // Sunday
    };
    this._timeCardsByDate = timecards = this.get('timeCards').forEach(function(tc) {
      date = tc.get('dateObject');
      ms = date.get('milliseconds');
      if (ms >= monday.get('milliseconds') && ms <= sunday.get('milliseconds')) {
        hash[date.get('dayOfWeek')] += tc.get('timeDisplay')+" ";
      }
    });
    return hash;
  },

  timeCardsDidChange: function() {
    this._timeCardsByDate = null;
  }.observes('timeCards'),

  unknownProperty: function(key,value) {
    if (SC.typeOf(key) == SC.T_NUMBER && key < 7 && key >= 0 ) {
      return this.timeCardsByDate()[key];
    } else if (SC.typeOf(key) === SC.T_NUMBER && key.length === 3) {

    }
  }

}) ;
