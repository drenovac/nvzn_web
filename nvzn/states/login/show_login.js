Nvzn.SHOW_LOGIN = SC.State.design({
  enterState: function() {
//    SC.routes.add(':pageName/:paneName', Nvzn.routes, 'route');
//    SC.routes.add(':', Nvzn.routes, 'route');

    var uiSurfaces = SC.app.getPath('ui.subsurfaces');

    if (!this._loginPanel) this._loginPanel = Nvzn.loginPanel.create();
    uiSurfaces.pushObject(this._loginPanel );

  },

  exitState: function() {
    var uiSurfaces = SC.app.getPath('ui.subsurfaces');
    uiSurfaces.removeObject(this._loginPanel);
  },

  submitLogin: function() {
    // Check for valid inputs
    var controller = Nvzn.loginController,
        username = controller.get('loginInput'),
        password = controller.get('passInput'),
        url = "/api/v1.1/login";

    if (SC.empty(username)) {
      controller.set('errorMessage', "Please enter Login and Password.");
      return;
    }

    // send to server
    controller.set('errorMessage', "Logging in ...");
    SC.Request.postUrl(url).json().notify(this, 'didLogin')
      .send({ username: username, password: password });
  },

  didLogin: function(req) {
    var controller = Nvzn.loginController,
        body = req.get('body');

    if (req.status === 401) {
      controller.set('errorMessage', "Incorrect Login or Password");
      return;
    }
    
    if (body.user) {
      this.statechart.sendEvent('loggedIn', body.user);
    } else {
      console.log("didLogin errored.");
    }

  }

});