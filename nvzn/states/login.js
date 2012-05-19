Nvzn.LOGIN = SC.State.design({
  initialSubstate: 'CHECK_LOGIN',

  enterState: function() {
    SC.app.set('ui', SC.LayoutSurface.create({
      didCreateElement: function(div) {
        // We don't want SC.View's implementation; don't call it.
        var style = div.style;
        style.backgroundImage = "url(/static/NSTexturedFullScreenBackgroundColor.png)";
        style.backgroundPosition = 'left top';
        style.backgroundRepeat = 'repeat';
      }
    }));
  },

  loggedIn: function(data) {
    var controller = Nvzn.loginController,
        userKey = Nvzn.store.loadRecord(Nvzn.User, data);
    controller.set('content', Nvzn.store.materializeRecord(userKey));
    this.gotoState('APP');
  },

  CHECK_LOGIN: SC.State.plugin('Nvzn.CHECK_LOGIN'),

  SHOW_LOGIN: SC.State.plugin('Nvzn.SHOW_LOGIN')

});