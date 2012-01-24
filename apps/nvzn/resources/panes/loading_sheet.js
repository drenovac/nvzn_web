/*global Nvzn */

Nvzn.loadingSheet = SC.SheetPane.create({
  layout: { width: 400, height: 166, centerX: 0, centerY: 0 },

  contentView: SC.View.design({
    childViews: 'locatingText spinnerView'.w(),

    locatingText: SC.LabelView.design({
      layout: { top: 30, height: 20 },

      textAlign: SC.ALIGN_CENTER,
      value: "Loading, please wait..."
    }), // locatingText

    spinnerView: SC.View.design({
      layout: { centerX: 0, centerY: 10, width: 32, height: 32 },
      classNames: 'loading-spinner'.w()
    }) // spinnerView
  })

});
