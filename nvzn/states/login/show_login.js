Nvzn.SHOW_LOGIN = SC.State.design({
  enterState: function() {
//    SC.routes.add(':pageName/:paneName', Nvzn.routes, 'route');
//    SC.routes.add(':', Nvzn.routes, 'route');

    SC.app.set('ui', SC.LayoutSurface.create());

    var panel = SC.LayoutSurface.create({
      layout: {height: 200, width: 400, centerX:0, centerY: 0}
    });
//    panel.set('frame', SC.MakeRect(50, 50, 400, 200));
    panel.set('backgroundColor', base3);
    panel.set('cornerRadius', 10);

    var titleBar = Nvzn.titleBar;
    titleBar.set('title', "Login");
//    titleBar.set('frame', SC.MakeRect(0, 0, 800, 20));

    var form = Nvzn.loginForm.create({
      layout: { top: 21, left: 10, right: 10, bottom:0, minLayoutWidth: 100, minLayoutHeight: 50}
    });
//    form.set('frame', SC.MakeRect(0, 20, 800, 300));

    panel.get('subsurfaces').pushObjects([titleBar, form]);

    SC.app.addSurface(panel);

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
    
    if (body.user) {
      this.statechart.sendEvent('loggedIn', body.user);
    } else {
      console.log("didLogin errored.");
    }

  }

});