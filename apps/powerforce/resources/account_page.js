// ==========================================================================
// Project:   Powerforce.accountPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Powerforce */
// This page describes a part of the interface for your application.
Powerforce.accountPage = SC.Page.create({
  
  mainView: SC.ContainerView.design({
    layout: { top: 20 },
    
    contentView: SC.SplitView.design({
      layout: {},
      layoutDirection: SC.LAYOUT_HORIZONTAL,
      defaultThickness: 0.15,
      
      topLeftMinThickness: 100,
      topLeftMaxThickness: 200,
      
      autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,
      
      topLeftView: SC.View.design({
        childViews: "account account_list".w(),
        backgroundColor: '#f6f6f6',

        account:SC.LabelView.design({
          layout:{left:10, width:140, top:10, height:24},
          classNames: "title",
          value: "Account"
        }),

        account_list: SC.ListView.design({
          layout:{top:35},
          backgroundColor: '#f6f6f6',
          contentIconKey:  'icon',
          hasContentIcon: YES,
          contentBinding: 'Powerforce.sidebarController.account_list',
          selectionBinding: 'Powerforce.sidebarController.selection',
        }),
        
      }),

      dividerView: SC.SplitDividerView.design({
        layout: {}
      }),
      
      
      bottomRightView: SC.ContainerView.design({
        backgroundColor: "white",
        
        contentView: SC.View.design({
          // layout: {centerX: 0, centerY: 0, width: 400, height: 400},
          
          childViews: "first_name first_name_input last_name last_name_input password password_input contact contact_input email email_input cancel submit".w(),

          first_name: SC.LabelView.design({
            layout: {left: 40, top: 30, width: 95},
            escapeHTML: NO,
            textAlign: SC.ALIGN_RIGHT,
            value: '<h1>First name</h1>',
            classNames: 'black'
          }),

          first_name_input: SC.TextFieldView.design({
            layout: {left: 150, top: 30, width: 200, height: 30},
            hint: 'John',
            isPassword: NO,
            isTextArea: NO
          }),

          last_name: SC.LabelView.design({
            layout: {left: 40, top: 90, width: 95},
            escapeHTML: NO,
            textAlign: SC.ALIGN_RIGHT,
            value: '<h1>Last name</h1>',
            classNames: 'black'
          }),

          last_name_input: SC.TextFieldView.design({
            layout: {left: 150, top: 90, width: 200, height: 30},
            hint: 'Smith',
            isPassword: NO,
            isTextArea: NO
          }),

          password: SC.LabelView.design({
            layout: {left: 40, top: 150, width: 95},
            escapeHTML: NO,
            textAlign: SC.ALIGN_RIGHT,
            value: '<h1>Password</h1>',
            classNames: 'black'
          }),

          password_input: SC.TextFieldView.design({
            layout: {left: 150, top: 150, width: 200, height: 30},
            hint: '*******',
            isPassword: YES,
            isTextArea: NO
          }),

          contact: SC.LabelView.design({
            layout: {left: 40, top: 210, width: 95},
            escapeHTML: NO,
            textAlign: SC.ALIGN_RIGHT,
            value: '<h1>Contact</h1>',
            classNames: 'black'
          }),

          contact_input: SC.TextFieldView.design({
            layout: {left: 150, top: 210, width: 200, height: 30},
            hint: '0429736182',
            isPassword: YES,
            isTextArea: NO
          }),

          email: SC.LabelView.design({
            layout: {left: 40, top: 270, width: 95},
            escapeHTML: NO,
            textAlign: SC.ALIGN_RIGHT,
            value: '<h1>Email</h1>',
            classNames: 'black'
          }),

          email_input: SC.TextFieldView.design({
            layout: {left: 150, top: 270, width: 200, height: 30},
            hint: 'john.smith@js.com',
            isPassword: YES,
            isTextArea: NO
          }),

          cancel: SC.ButtonView.design({
            layout: {left: 40, top: 330, width: 100, height: 30},
            title: 'Cancel',
            action: 'cancel',
            target: 'Powerforce.accountController'
          }),

          submit: SC.ButtonView.design({
            layout: {left: 250, top: 330, width: 100, height: 30},
            title: 'Update',
            action: 'submit',
            target: 'Powerforce.accountController',
            isDefault: YES
          })
          
        })// end contentView
        
      })// end bottomRight
      
    })// end contentView
    
  })// end mainView

});// end account page
