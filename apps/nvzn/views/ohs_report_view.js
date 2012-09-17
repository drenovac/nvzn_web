Nvzn.OhsReportView = EO.GridLayoutView.extend({

  classNames: ['ohs-report'],
  layout: {left: 0, top:0, right:0, bottom:0 },
//  contentBinding: 'Nvzn.formController',
  childViews: [
    "label1", 'field1',
    'label2', 'field2',
    'label3', 'field3'
  ],
  childViewHeight: 18,
  childViewPadding: 10,
  col: {
    1: 20,
    2: 160,
    3: 300
  },

  label1: SC.LabelView.design({
    row:1, col:1,
    value: "Surname:",
    textAlign: SC.ALIGN_RIGHT
  }),
  field1: SC.TextFieldView.design({
    row:1, col:2,
    valueBinding: 'Nvzn.formController.surname'
  }),

  label2: SC.LabelView.design({
    row:2, col:1,
    value: "Given Name:",
    textAlign: SC.ALIGN_RIGHT
  }),
  field2: SC.TextFieldView.design({
    row:2, col:2,
    valueBinding: 'Nvzn.formController.givenName'
  }),

  label3: SC.LabelView.design({
    row:3, col:1,
    value: "Client Name:",
    textAlign: SC.ALIGN_RIGHT
  }),
  field3: SC.TextFieldView.design({
    row:3, col:2,
    valueBinding: 'Nvzn.formController.weekEnding'
  })

});
