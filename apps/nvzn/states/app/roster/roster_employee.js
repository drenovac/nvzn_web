Nvzn.ROSTER_EMPLOYEE = Ki.State.design({

  initialSubstate: 'LOADING_EMPLOYEE',

  enterState: function() {
    Nvzn.set('mode', 'employee');
    Nvzn.getPath('mainPage.tabView').set('nowShowing', 'all_sites');
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
      });
    }
  }),

  SHOWING_EMPLOYEE: Ki.State.design({
    selectedNewDay: function() {
      this.gotoState('LOADING_EMPLOYEE');
    }

  })


});