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

    autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,

    dividerThickness: 2,
    dividerView:SC.SplitDividerView,

    topLeftView: SC.View.design({
      childViews: "when loading prev next weekEnding place where".w(),
      backgroundColor: '#f6f6f6',

      when: SC.LabelView.design({
        layout:{left:10, width:80, top:10, height:24},
        classNames: "title",
        value: "When",
        icon: 'when'
      }),

      loading: SC.ImageView.design({
        layout: {top: 10, right: 15, width: 16, height: 16},
        value: static_url('images/loading-spinner.gif'),
        isVisibleBinding: 'Nvzn.rosterController.loading'
      }),

      prev: SC.ButtonView.design({
        layout: {left: 5, top: 45, width: 75 },
        title: "Prev",
        isEnabledBinding: SC.Binding.not('Nvzn.rosterController.loading'),
        icon: static_url('images/up.png'),
        action: 'prev_week'
      }),

      next: SC.ButtonView.design({
        layout: {right: 5, top: 45, width: 75 },
        title: "Next",
        isEnabledBinding: SC.Binding.not('Nvzn.rosterController.loading'),
        icon: static_url('images/down.png'),
        action: 'next_week'
      }),

      weekEnding: SC.LabelView.design({
        layout: {left:10, right:10, top: 80, height:24},
        isVisibleBinding: SC.Binding.not('Nvzn.rosterController.loading'),
        valueBinding: SC.Binding.from('Nvzn.customerController.finish')
          .transform(function(value) {
            return "Week ending "+value;
          })
      }),

      place:SC.LabelView.design({
        layout:{left:10, width:150, top:100, height:24},
        classNames: "title",
        value: "Where",
        icon: 'flag-yellow'
      }),

      where: SC.ListView.design({
        layout:{top:135},
        backgroundColor: '#f6f6f6',
//        contentIconKey:  'icon',
//        hasContentIcon: YES,
//        contentValueKey: 'name',
        contentBinding: 'Nvzn.customersController',
        selectionBinding: 'Nvzn.customersController.selection'
      })

    }),

    bottomRightView: SC.SplitView.design({
      layoutDirection: SC.LAYOUT_VERTICAL,
      autoresizeBehavior: SC.RESIZE_TOP_LEFT,
      bottomRightMinThickness: 200,
      bottomRightMaxThickness: 300,
      dividerThickness: 2,
      defaultThickness: 0.3,
      topLeftView: Nvzn.UpcomingView.extend({
        contentBinding: 'Nvzn.rosterContent',
        selectionBinding: 'Nvzn.siteController.content'
      }),
      dividerView:SC.SplitDividerView,
      bottomRightView: Nvzn.InfoView.extend({
        contentBinding: 'Nvzn.siteController',
        contentTypeBinding: 'Nvzn.loginController.role'
      })
    })



  })// end containerView

});

