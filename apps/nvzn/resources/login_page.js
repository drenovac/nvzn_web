// ==========================================================================
// Project:   Nvzn.loginPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

// This page describes a part of the interface for your application.
Nvzn.loginPage = SC.Page.design({

  loginPane: SC.Pane.design({
    layout: { centerX: 0, centerY: 0, width: 450, height: 270 },
    childViews: 'logo prompt errorMessage loginLabel loginInput passLabel passInput submitButton'.w(),
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
      layout: { top: 95, left: 10, height: 20, width: 300 },
      classNames: ['error-message'],
      textAlign: SC.ALIGN_RIGHT,
      valueBinding: 'Nvzn.loginController.errorMessage'
    }),

    loginLabel: SC.LabelView.design({
      layout: { top: 110, left: 40, width: 95 },
      escapeHTML: NO,
      textAlign: SC.ALIGN_RIGHT,
      value: '<h1>Login</h1>',
      classNames: 'black'
    }),

    loginInput: SC.TextFieldView.design({
      layout: { left: 150, top: 110, width: 200, height: 30 },
      applyImmediately: YES,
      hint: 'site or employee',
      valueBinding: 'Nvzn.loginController.loginInput'
    }),

    passLabel: SC.LabelView.design({
      layout: { left: 40, top: 150, width: 95 },
      escapeHTML: NO,
      textAlign: SC.ALIGN_RIGHT,
      value: '<h1>Password</h1>',
      classNames: 'black'
    }),

    passInput: SC.TextFieldView.design({
      layout: { left: 150, top: 150, width: 200, height: 30 },
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
    })
  })
});