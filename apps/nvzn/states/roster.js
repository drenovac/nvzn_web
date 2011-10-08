Nvzn.ROSTER = Ki.State.design({
  enterState: function() {
    var controller = Nvzn.loginController,
        role = controller.get('role');

    SC.routes.set('location', "mainPage/mainPane");

    if (Nvzn.customersController.get('length') === 0){
      this._customers = Nvzn.store.find(Nvzn.Customer);
      Nvzn.customersController.set('content', this._customers);
    }

    if (role === 'site') {
      this.gotoState(this.ROSTER_SITE)
    } else {
      this.gotoState(this.ROSTER_EMPLOYEE)
    }

  },

  exitState: function() {
    
  },

  ROSTER_SITE: Ki.State.design({
    enterState: function() {
      Nvzn.getSiteData();
    }
  }),

  ROSTER_EMPLOYEE: Ki.State.design({

  })

});