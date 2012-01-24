Nvzn.APP = Ki.State.design({

  initialSubstate: 'ROSTER',

  enterState: function() {
    SC.routes.set('location', "mainPage/mainPane");
    Nvzn.getPath('mainPage.mainPane').append() ;
  },

  tabDidChange:function () {
    switch (Timesheet.mainPage.getPath('tabView.nowShowing')) {
      case 'all':
        this.gotoState('APP.ROSTER');
        break;

//      case 'subcontractors':
//        this.gotoState('APPLICATION.SUBCONTRACTORS');
//        break;

    }
    return YES;
  },

  ROSTER: Ki.State.plugin('Nvzn.ROSTER')
});