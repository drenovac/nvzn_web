SC.mixin(Nvzn, {

  getSiteData: function(){
//    var customer = this.getPath('selection.firstObject'),
//        url = "/api/v1.1/site/%@/timecards".fmt(customer.get('name'));
    var url = "/api/v1.1/site/timecards";
    SC.Request.getUrl(url).notify(this, 'loadSiteData').json().send();
  },

  loadSiteData: function(res) {
    var body = res.get('body');
    Nvzn.store.pushRetrieve(Nvzn.Customer, body.name, body);
  },

  getEmployeeData: function() {
    
  },

  loadEmployeeData: function() {

  }

});