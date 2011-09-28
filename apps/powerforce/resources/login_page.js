// ==========================================================================
// Project:   Powerforce.loginPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Powerforce */
 
// This page describes a part of the interface for your application.
Powerforce.loginPage = SC.Page.design({
 
  loginPane: SC.Pane.design({
    layout: { centerX: 0, centerY: 0, width: 450, height: 270 },
    childViews: 'logo prompt errorMessage loginLabel loginInput passLabel passInput forgotPassLink cancelButton submitButton'.w(),
    classNames: "login",
 
    logo: SC.ImageView.design({
      layout: { width: 181, left: 25, top: 15, height: 61 },
      value: sc_static('images/login-logo.png')
    }),

    prompt: SC.LabelView.design({
      layout: { top: 70, left: 28 },
      value: 'Enter your user name and password below to login.',
      classNames: 'black'
    }),
     
    errorMessage: SC.LabelView.design({
      layout: { top: 80, left: 10, height: 20, width: 230 },
      textAlign: SC.ALIGN_CENTER,
      valueBinding: 'Powerforce.appController.errorMessage',
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
      hint: 'admin',
      valueBinding: 'Powerforce.appController.loginInput'
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
      isPassword: YES,
      hint: '*******'
    }),
 
    forgotPassLink: SC.LabelView.design({
      layout: { top: 185, left: 150 },
      escapeHTML: NO,
      value: '<a style="color: black" href="#">Forgotten your login or password?</a>'
    }),
 
    submitButton: SC.ButtonView.design({
      layout: { left: 250, top: 220, width: 100, height: 30 },
      isDefault: YES,
      title: 'Submit',
      target: 'Powerforce.appController',
      action: 'login'
    }),
     
    cancelButton: SC.ButtonView.design({
      layout: {left: 90, top: 220, width: 100, height: 30},
      title: 'Cancel'
    })
  })
});