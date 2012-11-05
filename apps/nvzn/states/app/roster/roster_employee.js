Nvzn.ROSTER_EMPLOYEE = Ki.State.design({

  initialSubstate: 'LOADING_EMPLOYEE',

  enterState: function() {
    Nvzn.set('mode', 'employee');
    Nvzn.getPath('mainPage.tabView').set('nowShowing', 'sites_by_week');
    Nvzn.getPath('mainPage.submit').set('isVisible', NO);
    Nvzn.getPath('mainPage.header').set('isVisible', YES);
  },

  LOADING_EMPLOYEE: Ki.State.design({
    enterState: function() {
      Nvzn.rosterController.set('loading', YES);
      Nvzn.loadingSheet.append();
      Nvzn.getEmployeeData();
    },

    exitState: function() {
      Nvzn.rosterController.set('loading', NO);
      Nvzn.loadingSheet.remove();
    },

    dataDidLoad: function() {
//      Nvzn.setIfChanged('rosterContent', Nvzn.employeeController);
      this.gotoState('SHOWING_EMPLOYEE');
      this.invokeLater(function(){
        Nvzn.employeeController.propertyDidChange('customerTimecards');
        Nvzn.mainPage.sites_by_week.displayDidChange();
      });
    }
  }),

  SHOWING_EMPLOYEE: Ki.State.design({
    selectedNewDay: function() {
      this.gotoState('LOADING_EMPLOYEE');
    },

    customerSelectionChanged: function() {
      var selection = Nvzn.customersController.get('selection');
      var customerId = selection.firstObject();
      if (customerId) {
        var customer = Nvzn.store.find(Nvzn.Customer, customerId);
        Nvzn.customerController.set('content', customer);
      }
    }

  })


});