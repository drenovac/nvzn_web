Nvzn.loginForm = Nvzn.View.extend({
  childLayers: 'nameLabel'.w(),

  nameLabel: SC.LabelLayer.extend({
    layout: { top: 24, left: 16, height: 24, width: 72 },
    value: 'Username:'
  })

});