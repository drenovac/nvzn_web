Nvzn.APP = SC.State.design({

  initialSubstate: 'ROSTER',

  enterState: function() {
    SC.routes.set('location', "mainPage/mainPane");
    Nvzn.getPath('mainPage.mainPane').append() ;
  },

  tabDidChange:function () {
    switch (Nvzn.mainPage.getPath('tabView.nowShowing')) {
      case 'all_employees':
        this.gotoState('APP.ROSTER');
        break;

      case 'all_sites':
        this.gotoState('APP.ROSTER');
        break;

//      case 'subcontractors':
//        this.gotoState('APPLICATION.SUBCONTRACTORS');
//        break;

    }
    return YES;
  },

  logout: function() {
    var url = "/api/v1.1/logout";
    SC.Request.getUrl(url).notify(this, function(){ Nvzn.statechart.sendEvent('didLogout')}).json().send();
  },

  didLogout: function() {
    window.location.reload();
  },

  ROSTER: SC.State.plugin('Nvzn.ROSTER')
});