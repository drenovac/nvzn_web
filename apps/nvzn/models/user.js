// ==========================================================================
// Project:   Nvzn.User
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @class

  (Document your Model here)

  @extends SC.Record
 @version 0.1
 */
Nvzn.User = SC.Record.extend(
  /** @scope Nvzn.User.prototype */ {

    primaryKey: '_id',
    "_rev": SC.Record.attr(String),
    "type": SC.Record.attr(String),
    "role": SC.Record.attr(String),
//    "password": SC.Record.attr(),
    "password": function() {
      return "";
    }.property(),

    "customers": SC.Record.attr(Array),
    "firstName": SC.Record.attr(String),
    "lastName": SC.Record.attr(String),
    "phone": SC.Record.attr(String),
    "email": SC.Record.attr(String),

    fullName: function() {
      return [this.get('firstName'), this.get('lastName')].join(" ").strip();
    }.property('firstName', 'lastName')

}) ;
