Nvzn.ROSTER_SITE = Ki.State.design({
  initialSubstate: 'LOADING_SITE',

  enterState: function() {
    Nvzn.set('mode', 'site');
  },

  LOADING_SITE: Ki.State.design({
    enterState: function() {
      Nvzn.rosterController.set('loading', YES);
      Nvzn.loadingSheet.append();
      Nvzn.getPath('mainPage.mainPane.tabView').set('items', [
        {title:'All Employees', value:'all_employees'}
      ]).set('nowShowing', 'all_employees');
      Nvzn.getSiteData();
    },

    exitState: function() {
      Nvzn.rosterController.set('loading', NO);
      Nvzn.loadingSheet.remove();
    },

    dataDidLoad: function() {
      Nvzn.setIfChanged('rosterContent', Nvzn.customerController);
      this.gotoState('SHOWING_SITE');
    }
  }),

  SHOWING_SITE: Ki.State.design({

    selectedNewDay: function() {
      this.gotoState('LOADING_SITE');
    },

    customerSelectionChanged: function() {
      this.gotoState('LOADING_SITE');
    }
  })
});