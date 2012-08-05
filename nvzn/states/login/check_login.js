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

    var self = this;
//    Nvzn.loginController.set('role', "site");
//    setTimeout(function() {
//      SC.run(function(){
//        console.log("11");
//        var user = '{"status":"ok","user":{"_id":"site","_rev":"6-b3e0663d6e72854a8e04e7e139a723b2","type":"user","role":"site","firstName":"John","lastName":"Smith","phone":"0410444999","email":"john@smith.name","password":"5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8","db_id":"NVGI1","customers":["NVGI1","CENPARK-S","SIMBARR","DIIRD","CLCC","CNLR"]}}'
//        self.statechart.sendEvent('loggedIn', SC.json.decode(user).user);
//      })
//    }, 500);

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