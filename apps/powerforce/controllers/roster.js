// ==========================================================================
// Project:   Powerforce.rosterController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Powerforce */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Powerforce.rosterController = SC.ArrayController.create(
/** @scope Powerforce.rosterController.prototype */ {
  
  sortStateDidChange: function() {
    var column = this.get('sortedColumn');
    if( column == null || column.get('sortState') == null ) { return; }

    sort = column.get('sortState') == SC.SORT_ASCENDING ? 'ASC' : 'DESC';
    var query = SC.Query.local(Powerforce.Roster, { orderBy: column.get('key')+' '+sort });
    this.set('content', Powerforce.store.find(query));
  }.observes('*sortedColumn.sortState'),

}) ;
