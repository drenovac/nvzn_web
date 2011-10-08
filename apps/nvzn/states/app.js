Nvzn.APP = Ki.State.design({

  initialSubstate: 'ROSTER',

  enterState: function() {
    SC.routes.set('location', "mainPage/mainPane");
    Nvzn.getPath('mainPage.mainPane').append() ;
  },

  ROSTER: Ki.State.plugin('Nvzn.ROSTER')
});