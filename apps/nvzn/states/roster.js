Nvzn.ROSTER = Ki.State.design({

  initialSubstate: 'START',

  enterState: function() {
    var controller = Nvzn.loginController,
        role = controller.get('role');

    SC.routes.set('location', "mainPage/mainPane");

    window.setTimeout(function() {
      Nvzn.mainPage.mainPane.get('calendar').resetToSelectedDate()
    }, 100);

    if (role === 'site') {
      this.gotoState(this.ROSTER_SITE)
    } else {
      this.gotoState(this.ROSTER_EMPLOYEE)
    }

  },

  exitState: function() {
    
  },

  customerSelectionChanged: function() {
    var sel = Nvzn.customersController.get('selection');
    if (!sel) return;

    var customerId = sel.firstObject(),
      customer = Nvzn.store.find(Nvzn.Customer, customerId);
    if (customer) {
      Nvzn.customerController.set('content', customer);
    } else {
      Nvzn.customerController.set('content', null);
      Nvzn.getSiteData(customerId);
    }
  },

  START: Ki.State.design(),

  ROSTER_SITE: Ki.State.plugin('Nvzn.ROSTER_SITE'),

  ROSTER_EMPLOYEE: Ki.State.plugin('Nvzn.ROSTER_EMPLOYEE')

});