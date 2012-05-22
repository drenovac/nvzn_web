Nvzn.View = SC.View.extend({
  init: function() {
    sc_super();
    var layers = this.get('layers'), layer,
      self = this,
      children = this.get('childLayers') || [];
    sc_assert(SC.isArray(children), "childLayers needs to be an array.");
    this.beginPropertyChanges();
    children.forEach(function(layerName) {
      layer = self[layerName];
      sc_assert(layer, "You've given a layer named '%@' to childLayers. It can't be found".fmt(layerName));
      sc_assert(layer.create, "The object at %@ is not a layer class, have you already created it?".fmt(layerName));
      layers.pushObject(layer.create());
    });
    this.endPropertyChanges();

  }
});

Nvzn.Layer = SC.Layer.extend({
  init: function() {
    sc_super(); // Make sure that sublayers is setup properly.

    var layers = this.get('sublayers'), layer,
      self = this,
      children = this.get('childLayers') || [];
    sc_assert(SC.isArray(children), "childLayers needs to be an array.");
    this.beginPropertyChanges();
    children.forEach(function(layerName) {
      layer = self[layerName];
      sc_assert(layer, "You've given a layer named '%@' to childLayers. It can't be found".fmt(layerName));
      sc_assert(layer.create, "The object at %@ is not a layer class, have you already created it?".fmt(layerName));
      layers.pushObject(layer.create());
    });
    this.endPropertyChanges();
  }
});


Nvzn.LayoutSurface = SC.LayoutSurface.extend({
  init: function() {
    sc_super();
    var surfaces = this.get('subsurfaces'), layer,
      self = this,
      children = this.get('childSurfaces') || [];
    children.forEach(function(layerName) {
      layer = self[layerName];
      sc_assert(layer, "You've given a surface named '%@' to childSurfaces. It can't be found".fmt(layerName));
      sc_assert(layer.create, "The object at %@ is not a Surface class, have you already created it?".fmt(layerName));
      surfaces.pushObject(layer.create());
    })
  }
});