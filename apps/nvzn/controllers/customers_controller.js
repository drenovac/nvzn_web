// ==========================================================================
// Project:   Nvzn.customersController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Nvzn.customersController = SC.ArrayController.create(
/** @scope Nvzn.customersController.prototype */ {

  allowsEmptySelection: NO,

  selectionDidChange: function() {
    var customer = this.getPath('selection.firstObject'),
        url = "/api/v1.1/site/%@/timecards".fmt(customer.get('name'));

    SC.Request.getUrl(url).notify(this, 'loadEmployees').json().send();

  }.observes('selection'),

  loadEmployees: function(res) {
    var body = res.get('body');
    Nvzn.store.pushRetrieve(Nvzn.Customer, body.name, body);
  }

}) ;
