Nvzn.View = SC.View.extend({
  init: function() {
    sc_super();
    var layers = this.get('layers'), layer,
      self = this;
    this.get('childLayers').forEach(function(layerName) {
      layer = self[layerName];
      sc_assert(layer, "You've given a layer named '%@' to childLayers. It can't be found".fmt(layerName));
      sc_assert(layer.create, "The object at %@ is not a layer".fmt(layerName));
      layers.pushObject(layer.create());
    })
  }
})