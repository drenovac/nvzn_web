Nvzn.ROSTER_SITE = Ki.State.design({
  initialSubstate: 'LOADING_SITE',



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
//        if (Nvzn.customersController.get('length') === 0){
//          this._customers = Nvzn.store.find(Nvzn.Customer);
//          Nvzn.customersController.set('content', this._customers);
//        }
      //      var view = Nvzn.rosterPage.get('mainContentView');
      //      var bindings = view.bindings.filterProperty("_toPropertyPath", 'content');

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