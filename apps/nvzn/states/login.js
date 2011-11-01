Nvzn.LOGIN = SC.State.design({
  initialSubstate: 'CHECK_LOGIN',


  CHECK_LOGIN: SC.State.plugin('Nvzn.CHECK_LOGIN'),

  SHOW_LOGIN: SC.State.plugin('Nvzn.SHOW_LOGIN')

});