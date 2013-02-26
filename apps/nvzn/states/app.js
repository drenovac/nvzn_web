Nvzn.APP = Ki.State.design({

  initialSubstate: 'ROSTER',

  enterState: function() {
    SC.routes.set('location', "mainPage/mainPane");
    Nvzn.getPath('mainPage.mainPane').append() ;

    // Set Tabs
    if (Nvzn.loginController.get('role') == 'site') {
      Nvzn.getPath('mainPage.tabView').set('items', [
        {title:'View Rosters', value:'all_employees'},
        {title:'Approve Rosters', value: 'approve_tc'}
      ]);
    } else {
      Nvzn.getPath('mainPage.tabView').set('items', [
        {title: 'Coming Weeks', value:'sites_by_week'},
//        {title: 'This Week', value:'all_sites'},
        {title: 'OSH Report', value:'ohs_report'}
      ]);
    }

  },

  tabDidChange:function () {
    switch (Nvzn.mainPage.getPath('tabView.nowShowing')) {
      case 'all_employees':
        Nvzn.set('canEditManager', NO);
        Nvzn.set('canApproveManager', NO);
        this.gotoState('APP.ROSTER');
        break;

      case 'approve_tc':
        Nvzn.set('canEditManager', YES);
        Nvzn.set('canApproveManager', YES);
        this.gotoState('APP.ROSTER');
        break;

      case 'all_sites':
        this.gotoState('APP.ROSTER');
        break;

      case 'ohs_report':
        this.gotoState('OHS_REPORT');
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

  ROSTER: Ki.State.plugin('Nvzn.ROSTER'),
  OHS_REPORT: Ki.State.plugin('Nvzn.OHS_REPORT')
});