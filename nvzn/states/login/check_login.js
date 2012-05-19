Nvzn.CHECK_LOGIN = SC.State.design({
  enterState: function() {
    var loadingLabel = this.loadingLabel;

    if (!loadingLabel) {
      this.loadingLabel = loadingLabel = Nvzn.View.create({
        layout: {height: 40, width: 150, centerX:0, centerY:0},
        childLayers: "label".w(),
//        backgroundColor: 'transparent',
        clearBackground: true,

        label: SC.LabelLayer.extend({
          layout: {top:0, right: 10, bottom: 0, left: 0},
          backgroundColor: 'transparent',
          font: "18pt Helvetica, Arial, sans",
          color: '#fff',
          value: 'Loading ...'
        })
      });
    }
    loadingLabel.set('backgroundColor', 'transparent');

    var uiSurfaces = SC.app.getPath('ui.subsurfaces');
    uiSurfaces.pushObject(loadingLabel);

    SC.Request.getUrl('/api/v1.1/login').json().notify(this, 'checkedLogin').send();

  },

  exitState: function() {
    var uiSurfaces = SC.app.getPath('ui.subsurfaces');
    uiSurfaces.removeObject(this.loadingLabel);
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