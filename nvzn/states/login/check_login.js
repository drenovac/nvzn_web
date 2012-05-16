Nvzn.CHECK_LOGIN = SC.State.design({
  enterState: function() {
//    SC.app.set('ui', SC.View.create());
//
//    console.log("created ui");
//    var panel = Nvzn.form;
//    var titleBar = Nvzn.titleBar;
////    titleBar.set('frame', SC.MakeRect(0, 0, 800, 20));
//
//    panel.get('subsurfaces').pushObject(titleBar);
//    SC.app.addSurface(panel);

    SC.Request.getUrl('/api/v1.1/login').json().notify(this, 'checkedLogin').send();

  },

  checkedLogin: function(req) {
    if(SC.ok(req)) {
      var controller = Nvzn.loginController,
          body = req.get('body');
      if (req.status === 401) {
        this.gotoState('SHOW_LOGIN');
      } else {
        if (body.user) {
          this.statechart.sendEvent('loggedIn', body.user);
        } else {
          throw "Login error";
        }
      }
    } else {
      if (req.status === 401 || req.status === 500) {
        this.gotoState('SHOW_LOGIN');
      } else {
        console.error(req.error);
      }

    }
  },

  loadUser: function() {
    if (user.get('isEmployee')) {

    }
  }

});