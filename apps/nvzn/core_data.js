SC.mixin(Nvzn, {

  getSiteData: function(customer){
//    var customer = this.getPath('selection.firstObject'),
//        url = "/api/v1.1/site/%@/timecards".fmt(customer.get('name'));
    if(SC.empty(customer)) {
      var sel = Nvzn.customersController.get('selection');
      if (sel) customer = sel.firstObject();
    }

    if(SC.empty(customer)) return;
    var week = Nvzn.rosterController.get('week'),
        url = ("/api/v1.1/site/%@/timecards".fmt(customer)+ (week ? "?week="+week : ""));
    SC.Request.getUrl(url).notify(this, 'loadSiteData').json().send();
  },

  loadSiteData: function(res) {
    var body = res.get('body'),
        storeKey = Nvzn.store.pushRetrieve(Nvzn.Customer, body.name, body),
        customer = Nvzn.store.materializeRecord(storeKey);
    Nvzn.customerController.set('content', customer);
//    console.log("Did Load site Data");
    Nvzn.statechart.sendEvent('dataDidLoad');
  },

  getEmployeeData: function() {
    var url = "/api/v1.1/employee/timecards";
    SC.Request.getUrl(url).notify(this, 'loadEmployeeData').json().send();
  },

  loadEmployeeData: function(res) {
    var body = res.get('body');
    Nvzn.store.pushRetrieve(Nvzn.Employee, body.id, body);
//    console.log("Did Load employee Data");
    Nvzn.statechart.sendEvent('dataDidLoad');
  },

  createUser: function(data) {

  }

});