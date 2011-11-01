Nvzn.SHOW_LOGIN = SC.State.design({
  enterState: function() {
//    SC.routes.add(':pageName/:paneName', Nvzn.routes, 'route');
//    SC.routes.add(':', Nvzn.routes, 'route');

    Nvzn.getPath('loginPage.loginPane').append() ;
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

//    if (SC.empty(username) || SC.empty(password)) {
//      controller.set('errorMessage', "Please enter Login and Password.");
//      return;
//    }

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
      controller.set('content', SC.Object.create(body.user));
      this.gotoState('APP');
    } else {
//      debugger;
      console.log("didLogin errored.");
    }

  }

});