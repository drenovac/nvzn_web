/*globals Nvzn */

Nvzn.prefsPage = SC.Page.design({

  employeePrefsPane: SC.PanelPane.design({

    contentView: SC.View.design({
      classNames: 'main-container'.w(),

      borderStyle: SC.BORDER_GRAY,
      backgroundColor: "#dedede",
      layout: { centerY: -20, centerX: 0, width: 500, height: 400 },

      childViews: 'leftLabel left rightLabel right cancelButton saveButton'.w(),

      // ..........................................................
      // LEFT SIDE
      // 

      leftLabel: SC.LabelView.design({
        layout: { top: 12, left: 20, height: 18, width: 220 },
        valueBinding: SC.Binding.transform(function(value) {
          return "All Employees (%@)".fmt(value);
        }).from('Nvzn.employeesController.length'),
        localize: YES
      }),

      left: SC.ScrollView.design({
        layerId: 'employee-left',
        layout: { top: 32, left: 20, bottom: 48, width: 220 },

        // IMPORTANT: configure the left-side list view
        contentView: SC.ListView.design({

          // data bindings
          contentBinding: "Nvzn.employeesController.arrangedObjects",
          selectionBinding: "Nvzn.employeesController.selection",
          delegate: Nvzn.employeeDragController,

          // setup visual display
          contentValueKey: "fullName",
          hasContentIcon:  YES,
          contentIconKey:  "icon",
          rowHeight: 32,

          // enabled reordering and dragging
          canReorderContent: YES,
          isDropTarget: YES,
          
          // double-click action handling
          action: 'doubleClickedEmployees',
          target: Nvzn

        })
      }),

      // ..........................................................
      // RIGHT SIDE
      // 

      rightLabel: SC.LabelView.design({
        layout: { right: 20, top: 12, height: 18, width: 220 },
        valueBinding: SC.Binding.transform(function(value) {
          return "My Employees (%@)".fmt(value);
        }).from('Nvzn.myEmployeesController.length'),
        localize: YES
      }),

      right: SC.ScrollView.design({
        layerId: 'employee-right',
        layout: { right: 20, top: 32, bottom: 48, width: 220 },

        // IMPORTANT: Configure right-side of view
        contentView: SC.ListView.design({

          // data bindings
          contentBinding: "Nvzn.myEmployeesController.arrangedObjects",
          
          // note: share the same selection
          selectionBinding: "Nvzn.employeesController.selection",
          delegate: Nvzn.employeeDragController,

          // setup visual display
          contentValueKey: "fullName",
          hasContentIcon:  YES,
          contentIconKey:  "icon",
          rowHeight: 32,
          canDeleteContent: YES,
          // enabled reordering and dragging
          canReorderContent: YES,
          isDropTarget: YES

        })
      }),

      cancelButton: SC.ButtonView.design({
        layout: { width: 100, height: 24, bottom: 10, right: 140 },
        title: "Cancel",
        target: Nvzn.statechart, action: 'cancel'
      }),

      saveButton: SC.ButtonView.design({
        layout: { width: 100, height: 24, bottom: 10, right: 20 },
        title: "Save",
        target: Nvzn.statechart, action: 'save'
      })

    })
    
  })

});
