var tableColumns = [
  SC.TableColumn.create({
    key:   'guid',
    label: 'ID',
    width: 40
  }),
  SC.TableColumn.create({
    key:   'employee',
    label: 'Employee',
    width: 150
  }),
  SC.TableColumn.create({
    key:   'contact',
    label: 'Contact',
    width: 100
  }),
  SC.TableColumn.create({
    key:   'location',
    label: 'Location',
    // width: 200,
    // minWidth: 150
  }),
  SC.TableColumn.create({
    key:   'status',
    label: 'Status',
    // width: 200,
    // minWidth: 150
  }),
  SC.TableColumn.create({
    key:   'date',
    label: 'Date',
    width: 100
  }),
  SC.TableColumn.create({
    key:   'shift',
    label: 'Shift',
    width: 150,
    // minWidth: 150
  })
];

Powerforce.rosterPage = SC.Page.create({

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
      childViews: "time when place where".w(),
      backgroundColor: '#f6f6f6',

      time:SC.LabelView.design({
        layout:{left:10, width:140, top:10, height:24},
        classNames: "title",
        value: "When"
      }),

      when: SC.ListView.design({
        layout:{top:35},
        backgroundColor: '#f6f6f6',
        contentIconKey:  'icon',
        hasContentIcon: YES,
        contentBinding: 'Powerforce.sidebarController.time',
        selectionBinding: 'Powerforce.sidebarController.selection',
      }),

      place:SC.LabelView.design({
        layout:{left:10, width:140, top:160, height:24},
        classNames: "title",
        value: "Where"
      }),

      where: SC.ListView.design({
        layout:{top:185},
        backgroundColor: '#f6f6f6',
        contentIconKey:  'icon',
        hasContentIcon: YES,
        contentBinding: 'Powerforce.sidebarController.place',
        selectionBinding: 'Powerforce.sidebarController.selection',
      })

    }),

    dividerView: SC.SplitDividerView,

    bottomRightView:SC.SplitView.design({
      layoutDirection: SC.LAYOUT_VERTICAL,
      defaultThickness: 0.5,
      // dividerThickness: 3,

      topLeftMinThickness: 200,
      // topLeftMaxThickness: 300,
      bottomRightMinThickness: 380,
      autoresizeBehavior: SC.RESIZE_TOP_LEFT,

      topLeftView: SC.TableView.design({
        hasVerticalScroller: YES,
        layout:{top:40},
        columns: tableColumns,
        contentBinding: 'Powerforce.rosterController.arrangedObjects',
        selectionBinding: 'Powerforce.rosterController.selection',
        sortedColumnBinding: 'Powerforce.rosterController.sortedColumn',
        selectOnMouseDown: YES,
        exampleView: SC.TableRowView,
        canReorderContent: YES,
        recordType: Powerforce.Roster
      }),

      dividerView: SC.SplitDividerView.design({
        backgroundColor: 'white'
      }),

      bottomRightView: SC.View.design({
        childViews: 'showView'.w(),

        showView: SC.View.design({
          // childViews: "employee address site_phone start end status map".w(),
          hasVerticalScroller: YES,
          childViews: "employee contact location site_phone status shift map reject signin signin_at signout_at".w(),
          layout: {top: 20, left: 20, bottom: 20, right: 20},
          backgroundColor: 'white',

          employee: SC.LabelView.design({
            escapeHTML: NO,
            classNames: "black",
            layout: {top: 20, left: 20},
            value: "<h1>Mariah Bob</h1>"
          }),

          contact: SC.LabelView.design({
            escapeHTML: NO,
            classNames: "black",
            layout: {top: 40, left: 20},
            value: "<strong>Contact:</strong> 048378427",
          }),

          location: SC.LabelView.design({
            escapeHTML: NO,
            classNames: "black",
            layout: {top: 80, left: 20},
            value: "<p><strong>Location:</strong><br/>100 George St<br/>Sydney, NSW, 2000<br/>Australia</p>"
          }),

          site_phone: SC.LabelView.design({
            escapeHTML: NO,
            classNames: "black",
            layout: {top: 160, left: 20},
            value: "<strong>Site phone</strong>: 9383232"
          }),

          status: SC.LabelView.design({
            escapeHTML: NO,
            classNames: "green-text",
            layout: {top: 210, left: 20},
            value: "<h2>Confirmed</h2>"
          }),

          shift: SC.LabelView.design({
            escapeHTML: NO,
            classNames: "black",
            layout: {centerY: 0, right: 80, top:20},
            textAlign: SC.ALIGN_RIGHT,
            value: "<p><h1>20 Dec 2010</h1><br/>Shift: 09:00AM ~ 06:00PM</big></strong></p>"}),

          map: SC.ImageView.design({
            value: static_url('resources/images/map-google.gif'),
            layout: {centerY: 0, right: 80, top:100, width: 180, height: 150}
          }),

          signin: SC.ButtonView.design({
            layout: {centerY: 0, right: 180, top:270, width: 100, height: 150},
            title: "Sign",
            action: ""
          }),

          reject: SC.ButtonView.design({
            layout: {centerY: 0, right: 60, top:270, width: 100, height: 150},
            title: "Reject",
            action: ""
          }),

          signin_at: SC.LabelView.design({
            classNames: "black",
            escapeHTML: NO,
            layout: {top: 240, left: 20, width: 300},
            value: "<p>Sign in at:<br/> <strong><big>20 Dec 2010 09:00:00AM</big></strong></p>"
          }),

          signout_at: SC.LabelView.design({
            classNames: "black",
            escapeHTML: NO,
            layout: {top: 280, left: 20, width: 300},
            value: "<p>Sign out at:<br/> <strong><big>20 Dec 2010 06:00:00PM</big></strong></p>"
          })

        })

      })

    })// end bottomRightView

  })// end containerView
  
})

