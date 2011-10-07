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
  
  sortStateDidChange: function() {
    var column = this.get('sortedColumn');
    if( column == null || column.get('sortState') == null ) { return; }

    sort = column.get('sortState') == SC.SORT_ASCENDING ? 'ASC' : 'DESC';
    var query = SC.Query.local(Nvzn.Roster, { orderBy: column.get('key')+' '+sort });
    this.set('content', Nvzn.store.find(query));
  }.observes('*sortedColumn.sortState'),

}) ;
