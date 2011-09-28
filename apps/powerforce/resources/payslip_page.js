// ==========================================================================
// Project:   Powerforce.payslipPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Powerforce */

// This page describes a part of the interface for your application.
Powerforce.payslipPage = SC.Page.create({

  mainView: SC.ScrollView.design({
    layout: { top: 20 },
    hasHorizontalScroller: NO,
    backgroundColor: 'white',

    contentView: SC.SplitView.design({
      defaultThickness: 0.15, // a number between 0 and 1.0
      dividerThickness: 2,
      topLeftMinThickness: 100,
      topLeftMaxThickness: 100,

      topLeftView: SC.View.design({
	layout: { width: 100 },
	childViews: "year yearList".w(),
	backgroundColor: '#f6f6f6',

	year: SC.LabelView.design({
	  layout: { left: 10, width: 140, top: 10, height: 24 },
	  value: 'Year',
	  classNames: 'title'
	}),

	yearList: SC.ListView.design({
	  layout: { top: 35 },
	  contentIconKey:  'icon',
	  hasContentIcon: YES,
	  backgroundColor: '#f6f6f6',
	  contentBinding: 'Powerforce.yearsController.arrangedObjects',
	  selectionBinding: 'Powerforce.yearsController.selection'
	})
      }),

      dividerView: SC.SplitDividerView,

      bottomRightView: SC.SplitView.design({
	layoutDirection: SC.LAYOUT_VERTICAL,

	topLeftView: SC.TableView.design({
	  hasVerticalScroller: YES,
	  exampleView: SC.TableRowView,
	  contentBinding: 'Powerforce.payslipsController.arrangedObjects',
	  selectionBinding: 'Powerforce.payslipsController.selection',
	  columns: [
	    SC.TableColumn.create({
	      key:   'toString',
	      label: 'Payslip'
	    })
	  ]
	}),

	dividerView: SC.SplitDividerView,

	bottomRightView: SC.ContainerView.design({
	  contentView: SC.View.design({
	    layout: { top: 30, left: 60 },
	    childViews: 'summary details download'.w(),

	    summary: SC.View.design({
	      childViews: 'employee payPeriod rate hours net'.w(),

	      employee: SC.LabelView.design({
		escapeHTML: NO,
		value: "<big><strong>John Smith</strong></big>",
		classNames: 'black'
	      }),

	      payPeriod: SC.LabelView.design({
		layout: { top: 30 },
		value: "Payment from 1 Jan 2011 to 14 Jan 2011",
		classNames: 'black'
	      }),

	      net: SC.LabelView.design({
		layout: { top: 30, left: 530 },
		value: 'net: $1320',
		classNames: 'black'
	      }),

	      rate: SC.LabelView.design({
		layout: { top: 30, left: 340 },
		value: 'rate: $20/hr',
		classNames: 'black'
	      }),

	      hours: SC.LabelView.design({
		layout: { top: 30, left: 440 },
		value: 'hours: 76',
		classNames: 'black'
	      })
	    }),

	    details: SC.View.design({
	      layout: { top: 60 },
	      childViews: 'detail gross tax super net'.w(),

	      detail: SC.LabelView.design({
		layout: { top: 10 },
		escapeHTML: NO,
		value: '<strong>Payment details</strong>',
		classNames: 'black'
	      }),

	      gross: SC.LabelView.design({
		layout: { top: 40, left: 20 },
		escapeHTML: NO,
		value: '<pre>Gross:   $1520</pre>',
		classNames: 'black'
	      }),

	      tax: SC.LabelView.design({
		layout: { top: 60, left: 20 },
		escapeHTML: NO,
		value: '<pre>Tax:     $ 100 -</pre>',
		classNames: 'black'
	      }),

	      'super': SC.LabelView.design({
		layout: { top: 80, left: 20 },
		escapeHTML: NO,
		value: '<pre>Super:   $ 100 -</pre>',
		classNames: 'black'
	      }),

	      net: SC.LabelView.design({
		layout: { top: 100, left: 20 },
		escapeHTML: NO,
		value: '<pre>Net:     $1320</pre>',
		classNames: 'black'
	      }),
	    }),

	    'download': SC.ButtonView.design({
	      layout: { top: 200, width: 200 },
	      title: 'download this payslip'
	    })
	  })
	})
      })
    })
  })

});
