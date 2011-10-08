Nvzn.LOGIN = Ki.State.design({
  initialSubstate: 'CHECK_LOGIN',


  CHECK_LOGIN: Ki.State.plugin('Nvzn.CHECK_LOGIN'),

  SHOW_LOGIN: Ki.State.plugin('Nvzn.SHOW_LOGIN')

});