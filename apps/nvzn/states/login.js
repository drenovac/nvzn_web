Nvzn.LOGIN = Ki.State.design({
  initialSubstate: 'CHECK_LOGIN',

  loggedIn: function(data) {
    var controller = Nvzn.loginController,
        userKey = Nvzn.store.loadRecord(Nvzn.User, data);
    controller.set('content', Nvzn.store.materializeRecord(userKey));
    if (controller.get('db_id')) Nvzn.local.set('userDomain', controller.get('db_id'));
    var sent = Nvzn.local.get('sent');
    if (!sent) Nvzn.local.set('sent', {});
//    if (Nvzn.local.get('canApproveManager') !== undefined) {
//
//    }
    this.gotoState('APP');
  },

  CHECK_LOGIN: Ki.State.plugin('Nvzn.CHECK_LOGIN'),

  SHOW_LOGIN: Ki.State.plugin('Nvzn.SHOW_LOGIN')

});