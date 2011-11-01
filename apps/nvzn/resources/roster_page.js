Nvzn.rosterPage = SC.Page.create({

  mainContentView: SC.outlet('containerView.bottomRightView'),

  containerView:SC.SplitView.design({
    classNames: "container-view",
    layoutDirection: SC.LAYOUT_HORIZONTAL,
    layout: { left: 0, top: 20, right: 0, bottom: 0 },
    defaultThickness: 0.15, // a number between 0 and 1.0

    topLeftMinThickness: 100,
    topLeftMaxThickness: 200,
    // bottomRightMinThickness: 300,

    // autoresizeBehavior: SC.RESIZE_BOTH,
    // autoresizeBehavior: SC.RESIZE_TOP_LEFT,
    autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,

    dividerThickness: 2,

    topLeftView: SC.View.design({
      childViews: "place where".w(),
      backgroundColor: '#f6f6f6',

      place:SC.LabelView.design({
        layout:{left:10, width:140, top:10, height:24},
        classNames: "title",
        value: "Where"
      }),

      where: SC.ListView.design({
        layout:{top:35},
        backgroundColor: '#f6f6f6',
//        contentIconKey:  'icon',
//        hasContentIcon: YES,
        contentValueKey: 'name',
        contentBinding: 'Nvzn.customersController',
        selectionBinding: 'Nvzn.customersController.selection'
      })

    }),

    dividerView: SC.SplitDividerView,

    bottomRightView: Nvzn.UpcomingView.extend({
      contentBinding: 'Nvzn.rosterContent'
    })

  })// end containerView

});

