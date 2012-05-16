Nvzn.LOGIN = SC.State.design({
  initialSubstate: 'CHECK_LOGIN',

  loggedIn: function(data) {
    var controller = Nvzn.loginController,
        userKey = Nvzn.store.loadRecord(Nvzn.User, data);
    controller.set('content', Nvzn.store.materializeRecord(userKey));
    this.gotoState('APP');
  },

  CHECK_LOGIN: SC.State.plugin('Nvzn.CHECK_LOGIN'),

  SHOW_LOGIN: SC.State.plugin('Nvzn.SHOW_LOGIN')

});