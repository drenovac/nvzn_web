Nvzn.SHOW_LOGIN = Ki.State.design({
  enterState: function() {
//    SC.routes.add(':pageName/:paneName', Nvzn.routes, 'route');
//    SC.routes.add(':', Nvzn.routes, 'route');

    var pane = Nvzn.getPath('loginPage.loginPane');
    pane.append() ;
    pane.becomeKeyPane();
//    pane.get('loginInput').becomeFirstResponder();
  },

  exitState: function() {
    Nvzn.getPath('loginPage.loginPane').remove();
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
    if (req.status === 500) {
      controller.set('errorMessage', "The server was not able to log you in");
      return;
    }
    
    if (body.user) {
      this.statechart.sendEvent('loggedIn', body.user);
    } else {
      console.log("didLogin errored.");
    }

  }

});