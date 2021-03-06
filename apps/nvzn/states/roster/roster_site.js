Nvzn.ROSTER_SITE = Ki.State.design({
  initialSubstate: 'LOADING_SITE',

  enterState: function() {
    Nvzn.set('mode', 'site');
    Nvzn.getPath('mainPage.mainPane.tabView').set('items', [
      {title:'All Employees', value:'all_employees'}
    ]).set('nowShowing', 'all_employees');
  },

  LOADING_SITE: Ki.State.design({
    enterState: function() {
      Nvzn.rosterController.set('loading', YES);
      Nvzn.loadingSheet.append();
      Nvzn.getSiteData();
    },

    exitState: function() {
      Nvzn.rosterController.set('loading', NO);
      Nvzn.loadingSheet.remove();
    },

    dataDidLoad: function() {
//      Nvzn.setIfChanged('rosterContent', Nvzn.rosterController);
      this.gotoState('SHOWING_SITE');
    }
  }),

  SHOWING_SITE: Ki.State.design({

    selectedNewDay: function() {
      this.gotoState('LOADING_SITE');
    },

    customerSelectionChanged: function() {
      this.gotoState('LOADING_SITE');
    },

    submitApprovals: function() {
      this.gotoState('SAVING_SITE');
    },

    clickedApprove: function(storeKey) {
      console.log("APPROVE!!", storeKey);
      Nvzn.editScope.recordDidChange(null, null, storeKey, undefined, YES);
      Nvzn.mainPage.all_employees.displayDidChange();
    }
  }),

  SAVING_SITE: Ki.State.design({

    enterState: function() {
      Nvzn.rosterController.set('loading', YES);
      Nvzn.loadingSheet.append();

      var changeset = Nvzn.editScope.computeChangeset(),
        timecardChanges = changeset.TimeCard;

      if (timecardChanges) {
        console.log('we have', timecardChanges.updated.length, 'timechards to submit');
        Nvzn.submitTimeCards(changeset);
      } else {
       this.gotoState('SHOWING_SITE');
      }

    },

    exitState: function() {
      Nvzn.rosterController.set('loading', NO);
      Nvzn.loadingSheet.remove();
    },

    timeCardsSubmitted: function() {
      this.gotoState('SHOWING_SITE');
    }

  })
});