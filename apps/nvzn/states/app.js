Nvzn.APP = Ki.State.design({

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

  ROSTER: Ki.State.plugin('Nvzn.ROSTER')
});