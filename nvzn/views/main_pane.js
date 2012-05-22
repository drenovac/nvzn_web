sc_require('views/view');

Nvzn.mainPane = Nvzn.View.extend({
  layout: {top: 0, right:0, bottom: 0, left:0},
  childLayers:'sidebar page'.w(),
  clearBackground: true,

  sidebar: Nvzn.Layer.extend({
    layout:{ top: 0, left:0, bottom:0, width:210 },
    childLayers: "logo whereTitle whereList".w(),

    logo: Nvzn.Layer.extend({
      layout: {width: 200, height: 61, top: 10, left: 5 },
      render: function(ctx) {
        ctx.drawImage(Nvzn.images['logo'], 0, 0);
      }
    }),

    whereTitle: SC.LabelLayer.extend({
      layout: { top: 200, left: 20, right: 20, height: 24 },
      value: "Where",
      backgroundColor: 'transparent',
      isVisibleBinding: 'Nvzn.isSite'
    }),

    whereList: SC.ListView.extend({
      layout: { top: 220, left: 10, right: 10, bottom: 5},
      contentBinding:'Nvzn.customersController.arrangedObjects',
      selectionBinding:'Nvzn.customersController.selection'
    })

  }),

  page: Nvzn.Layer.extend({
    layout:{ left:194, top:4, bottom:4, right:4, minLayoutWidth:875 },
    childLayers: "border".w(),

    border: Nvzn.Layer.extend({
      layout: { top: 0, right: 0, bottom: 0, left: 0 },

      render: function(ctx) {
        var pageWidth = ctx.width - 230;
        ctx.save();
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur    = 20;
        ctx.shadowColor   = 'rgba(0, 0, 0, 0.6)';
        ctx.fillStyle     = '#fff';
        ctx.fillRect(25, 5, pageWidth, ctx.height - 20);
        ctx.restore();

        var paperWidth = pageWidth < 2000 ? pageWidth : 2000;
        ctx.drawImage(Nvzn.images['paper1'], 0, 0, paperWidth, 50, 25, 5, paperWidth, 50);
        ctx.drawImage(Nvzn.images['paper2'], pageWidth - 110, 17)
      }
    })

  })

});