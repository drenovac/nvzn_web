Nvzn.CHECK_LOGIN = Ki.State.design({
  enterState: function() {

    if($.browser.msie && $.browser.version < 9) {
      var pane = Nvzn.getPath('loginPage.chromeFramePane');
      pane.append();
      CFInstall.check({
        mode: "overlay", // the default
        node: "prompt"
      });
      return;
    }

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
      if (req.status === 401) {
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