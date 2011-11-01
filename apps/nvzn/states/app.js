Nvzn.APP = SC.State.design({

  initialSubstate: 'ROSTER',

  enterState: function() {
    SC.routes.set('location', "mainPage/mainPane");
    Nvzn.getPath('mainPage.mainPane').append() ;
  },

  ROSTER: SC.State.plugin('Nvzn.ROSTER')
});