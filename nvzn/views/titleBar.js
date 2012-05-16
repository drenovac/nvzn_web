
Nvzn.titleBar = SC.View.create({
  layout: { top: 0, left: 0, right: 0, height: 20, minLayoutWidth: 100 },
  title: "Change Me",

  willRenderLayers: function(ctx) {
    // console.log('FormDemo.form#willRenderLayers()', SC.guidFor(this));
    var w = ctx.width, h = ctx.height;

    // Draw background.
    ctx.fillStyle = base2;
    ctx.fillRect(0, 0, w, h);

    // Draw window title.
    ctx.fillStyle = base03;
    ctx.font = "11pt Calibri";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(this.get('title'), w/2, 10);
  },

  mouseDown: function(evt) {
    // console.log('FormDemo.form#mouseDown');
    this._clientX = evt.clientX;
    this._clientY = evt.clientY;
    return true;
  },

  mouseDragged: function(evt) {
    // console.log('FormDemo.form#mouseDragged');
    SC.AnimationTransaction.begin({ duration: 0 });
    var frame = this.getPath('supersurface.frame');
    frame.x = frame.x + evt.clientX - this._clientX;
    frame.y = frame.y + evt.clientY - this._clientY;
    this._clientX = evt.clientX;
    this._clientY = evt.clientY;
    SC.AnimationTransaction.end();
    return true;
  },

  mouseUp: function(evt) {
    // console.log('FormDemo.form#mouseUp');
    SC.AnimationTransaction.begin({ duration: 0 });
    var frame = this.getPath('supersurface.frame');
    frame.x = frame.x + evt.clientX - this._clientX;
    frame.y = frame.y + evt.clientY - this._clientY;
    delete this._clientX;
    delete this._clientY;
    SC.AnimationTransaction.end();
    return true;
  }

});