// ==========================================================================
// Project:   Nvzn.loginPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

// This page describes a part of the interface for your application.
Nvzn.loginPage = SC.Page.design({

  chromeFramePane: SC.Pane.design({
    layout: { top: 0, bottom:0, right:0, left: 0 },
    childViews: 'header prompt'.w(),

    header: SC.LabelView.design({
      layout: {top:20, width:800, centerX:0, height: 50},
      value: "<h2>Envizion was made for use with a modern browser.</h2>"
        + "<p>Please upgrade to the newest Internet Explorer, or install Chrome Frame. Chrome Frame does not need Admin rights.</p>",
      textAlign: SC.ALIGN_MIDDLE,
      escapeHTML: NO
    }),

    prompt: SC.View.design({
      layerId: 'prompt',
      layout: {top: 50, left: 0, right: 0, bottom:0}
    })
  }),

  loginPane: SC.Pane.design({
    layout: { centerX: 0, centerY: 0, width: 450, height: 330 },
    childViews: ('logo prompt errorMessage ' +
      'loginLabel loginInput passLabel passInput submitButton ' +
      'demoLabel approveCheck editCheck employeeSiteCheck').w(),
    classNames: "login",

    defaultResponder: 'Nvzn.statechart',

    focusFrom: function(pane) {
      console.log('loginPane FocusFrom', pane);
    },

    logo: SC.ImageView.design({
      layout: { width: 181, right: 100, top: 0, height: 61 },
      value: sc_static('image/envizion-logo.png')
    }),

    prompt: SC.LabelView.design({
      layout: { top: 75, right: 100 },
      textAlign:SC.ALIGN_RIGHT,
      value: 'Enter your user name and password below to login.',
      classNames: 'black'
    }),

    errorMessage: SC.LabelView.design({
      layout: { top: 189, left: 10, height: 20, width: 300 },
      classNames: ['error-message'],
      textAlign: SC.ALIGN_RIGHT,
      valueBinding: 'Nvzn.loginController.errorMessage'
    }),

    loginLabel: SC.LabelView.design({
      layout: { top: 120, left: 40, width: 95, height:20 },
      escapeHTML: NO,
      textAlign: SC.ALIGN_RIGHT,
      value: '<h1>Login</h1>',
      classNames: 'black'
    }),

    loginInput: SC.TextFieldView.design({
      layout: { left: 150, top: 116, width: 200, height: 25 },
      applyImmediately: YES,
      hint: 'site or employee',
      valueBinding: 'Nvzn.loginController.loginInput'
    }),

    passLabel: SC.LabelView.design({
      layout: { left: 40, top: 160, width: 95, height: 20  },
      escapeHTML: NO,
      textAlign: SC.ALIGN_RIGHT,
      value: '<h1>Password</h1>',
      classNames: 'black'
    }),

    passInput: SC.TextFieldView.design({
      layout: { left: 150, top: 156, width: 200, height: 25 },
      applyImmediately: YES,
      valueBinding: 'Nvzn.loginController.passInput',
      isPassword: YES,
      hint: '*******'
    }),

    forgotPassLink: SC.LabelView.design({
      layout: { top: 185, left: 150 },
      escapeHTML: NO,
      value: '<a style="color: black" href="#">Forgotten your login or password?</a>'
    }),

    submitButton: SC.ButtonView.design({
      layout: { left: 250, top: 220, width: 100, height: 24 },
      isDefault: YES,
      supportFocusRing: YES,
      title: 'Login',
      action: 'submitLogin'
    }),

    cancelButton: SC.ButtonView.design({
      layout: {left: 90, top: 220, width: 100, height: 24},
      title: 'Cancel'
    }),

    demoLabel: SC.LabelView.design({
      layout: { top: 250, left: 40, width: 400, height: 20 },
      isVisibleBinding: SC.Binding.oneWay('Nvzn.isDemo'),
      escapeHTML: NO,
      textAlign: SC.ALIGN_LEFT,
      value: 'In Demo Mode you can enable the following options.',
      classNames: 'black'
    }),

    approveCheck: SC.CheckboxView.design({
      layout: { top: 270, left: 40, width: 300, height: 20 },
      isVisibleBinding: SC.Binding.oneWay('Nvzn.isDemo'),
      title: "Manager Login: Approve Time Cards",
      valueBinding: 'Nvzn.canApproveManager'
    }),

    editCheck: SC.CheckboxView.design({
      layout: { top: 290, left: 40, width: 300, height: 20 },
      isVisibleBinding: SC.Binding.oneWay('Nvzn.isDemo'),
      isEnabledBinding: SC.Binding.oneWay('Nvzn.canApproveManager'),
      title: "Manager Login: Edit Time Cards",
      valueBinding: 'Nvzn.canEditManager'
    }),

    employeeSiteCheck: SC.CheckboxView.design({
      layout: { top: 310, left: 40, width: 300, height: 20 },
      isVisibleBinding: SC.Binding.oneWay('Nvzn.isDemo'),
      title: "Employee Login: Show Site Info inline",
      valueBinding: 'Nvzn.showInlineSite'
    })
  })
});