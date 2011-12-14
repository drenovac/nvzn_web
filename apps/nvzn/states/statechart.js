Nvzn.statechart = Ki.Statechart.create({

  trace: YES,

  rootState: Ki.State.design({
    initialSubstate: 'LOGIN',

    LOGIN: Ki.State.plugin('Nvzn.LOGIN'),
    LOADING: Ki.State.plugin('Nvzn.LOADING'),
    APP: Ki.State.plugin('Nvzn.APP')

  })
});