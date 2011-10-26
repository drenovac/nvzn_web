Nvzn.ROSTER = Ki.State.design({

  initialSubstate: 'START',

  enterState: function() {
    var controller = Nvzn.loginController,
        role = controller.get('role');

    SC.routes.set('location', "mainPage/mainPane");

    if (role === 'site') {
      this.gotoState(this.ROSTER_SITE)
    } else {
      this.gotoState(this.ROSTER_EMPLOYEE)
    }

  },

  exitState: function() {
    
  },

  START: Ki.State.design(),

  ROSTER_SITE: Ki.State.design({
    enterState: function() {
      Nvzn.getSiteData();
    },

    dataDidLoad: function() {
      if (Nvzn.customersController.get('length') === 0){
        this._customers = Nvzn.store.find(Nvzn.Customer);
        Nvzn.customersController.set('content', this._customers);
      }
      var view = Nvzn.rosterPage.get('mainContentView');
      var bindings = view.bindings.filterProperty("_toPropertyPath", 'content');
//      bindings.forEach(function(b) {
//        b.disconnect();
//        bindings.removeObject(b);
//      });
//      view.bind('content', Nvzn.employeesController, 'content');
      Nvzn.set('rosterContent', Nvzn.customerController);
    }

  }),

  ROSTER_EMPLOYEE: Ki.State.design({
    enterState: function() {
      Nvzn.getEmployeeData();
    },

    dataDidLoad: function() {
      var lController = Nvzn.loginController,
          id = lController.get('id');
      if ((!this._employee) || this._employee.get('id') !== id) {
        console.log("w00t?");
        this._employee = Nvzn.store.find(Nvzn.Employee, id);
      } else {
        console.log("what?");
      }

      Nvzn.set('rosterContent', this._employee);
    }

  })

});