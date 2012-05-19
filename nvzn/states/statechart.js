Nvzn.statechart = SC.Statechart.create({

  trace: YES,

  rootState: SC.State.design({
    initialSubstate: 'LOGIN',

    LOGIN: SC.State.plugin('Nvzn.LOGIN'),
    LOADING: SC.State.plugin('Nvzn.LOADING'),
    APP: SC.State.plugin('Nvzn.APP')

  })
});