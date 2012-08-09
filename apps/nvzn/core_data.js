SC.mixin(Nvzn, {

  /*
   * Data Functions
   */
  weeksBetweenDates: function(dateA, dateB) {
    var yearDiff = dateB.get('year') - dateA.get('year');
    var weekDiff = dateB.get('week1') - dateA.get('week1');
    return Math.round(yearDiff * 52.177457) + weekDiff;
  },

  weeksFromWeekEnding: function() {
    return this.weeksBetweenDates(this.weekEndingFor(SC.DateTime.create()), Nvzn.get('weekEnding'));
  },

  weekEndingFor: function(date) {
    var isSunday = !date.get('dayOfWeek');
    if (!isSunday) {
      date = date.get('nextSunday');
    }
    return date;
  },

  /*
   * Site Data
   */
  getSiteData: function(customer){

    if(SC.empty(customer)) {
      var sel = Nvzn.customersController.get('selection');
      if (sel) customer = sel.firstObject();
    }

    if(SC.empty(customer)) return;
    var week = Nvzn.weeksFromWeekEnding(),
        url = ("/api/v1.1/site/%@/timecards".fmt(customer) + (week ? "?week="+week : ""));
    SC.Request.getUrl(url).notify(this, 'loadSiteData').json().send();
  },

  loadSiteData: function(res) {
    if (Nvzn.editScope) Nvzn.editScope.destroy();
    var body = res.get('body'),
        S = Nvzn.store,
        storeKey = S.pushRetrieve(Nvzn.Customer, body.customer.id, body.customer),
        editScope = S.chain(),
        customer = editScope.materializeRecord(storeKey);
    Nvzn.editScope = editScope;
    if (body.employees && body.employees.length) S.loadRecords(Nvzn.Employee, body.employees);
    if (body.timecards && body.timecards.length) S.loadRecords(Nvzn.TimeCard, body.timecards);
    Nvzn.customerController.set('content', customer);
//    console.log("Did Load site Data");
    Nvzn.statechart.sendEvent('dataDidLoad');
  },

  /*
   * Employee Data
   */
  getEmployeeData: function(employee) {

    var week = Nvzn.weeksFromWeekEnding(),
        url = "/api/v1.1/employee/timecards" + (week ? "?week=" + week : "");
    SC.Request.getUrl(url).notify(this, 'loadEmployeeData').json().send();
  },

  loadEmployeeData: function(res) {
    var body = res.get('body'),
        S = Nvzn.store,
        storeKey = S.pushRetrieve(Nvzn.Employee, body.id, body),
        employee = S.materializeRecord(storeKey);
    Nvzn.employeeController.set('content', employee);
    Nvzn.statechart.sendEvent('dataDidLoad');
  },

  createUser: function(data) {

  },

  submitTimeCards: function(changeset) {
    var url = "/api/v1.1/timecards";
    SC.Request.postUrl(url).notify(this, 'timeCardsDidSubmit').json().send(changeset);
  },

  timeCardsDidSubmit: function() {
    // Load timecards into store
    var custCon = Nvzn.customerController,
        storeKey = custCon.get('storeKey');
    if (Nvzn.editScope) Nvzn.editScope.destroy();
    Nvzn.editScope = Nvzn.store.chain();
    var customer = Nvzn.editScope.materializeRecord(storeKey);
    custCon.set('content', customer);

    Nvzn.statechart.sendEvent('timeCardsSubmitted');
  }

});