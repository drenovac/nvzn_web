SC.mixin(Nvzn, {

  getSiteData: function(week){
//    var customer = this.getPath('selection.firstObject'),
//        url = "/api/v1.1/site/%@/timecards".fmt(customer.get('name'));
    var week = Nvzn.rosterController.get('week'),
        url = ("/api/v1.1/site/timecards"+ (week ? "?week="+week : ""));
    SC.Request.getUrl(url).notify(this, 'loadSiteData').json().send();
  },

  loadSiteData: function(res) {
    var body = res.get('body');
    Nvzn.store.pushRetrieve(Nvzn.Customer, body.name, body);
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
  }

});