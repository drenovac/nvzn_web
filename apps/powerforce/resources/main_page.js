Powerforce.mainPage = SC.Page.create({
  
  mainPane: SC.MainPane.design({
    childViews: 'header tabs'.w(),
    
    header: SC.ToolbarView.design({
      layout: { height: 60 },
      classNames: 'toolbar',
      childViews: 'logo greet help logout'.w(),
      anchorLocation: SC.ANCHOR_TOP,
      
      logo: SC.ImageView.design({
	      layout: { width: 200, left: 10 },
        value: sc_static('images/toolbar-logo.png')
      }),
      
      greet:SC.LabelView.design({
        layout: { centerY: 0, height: 16, right: 160 },
        escapeHTML: NO,
        textAlign: SC.ALIGN_RIGHT,
        escapeHTML: NO,
        value: '<a href="#mainPage/mainPane">John Smith</a>',
        icon: 'sc-icon-user-16'
      }),
      
      help:SC.LabelView.design({
        layout: {centerY: 0, right: 100, height: 16, width: 70 },
        escapeHTML: NO,
        textAlign: SC.ALIGN_RIGHT,
        value: "<a href='#mainPage/mainPane'>Help</a>",
        icon: "sc-icon-help-16"
      }),

      logout:SC.ButtonView.design({
        layout: { centerY: 0, height: 24, right: 12, width: 80 },
        title: 'Logout',
        target: 'Powerforce.appController',
        action: 'logout'
      })
      
    }),
    // End header
    
    tabs: SC.TabView.design({
      classNames: 'tabs',
      
      layout: { left:0, right:0, top: 0, bottom:0 },
      tabHeight: 75,

      items: [
        { 
          classNames: 'menu',
          title: "Roster", 
          value: "Powerforce.rosterPage.containerView", 
          icon: sc_static("images/icons/briefcase.png")
        },
        { 
          classNames: 'menu',
          title: "Payslip", 
          value: "Powerforce.payslipPage.mainView", 
          icon: sc_static("images/icons/payslips.png")
        },
        { 
          classNames: 'menu',
          title: "Account", 
          value: "Powerforce.accountPage.mainView", 
          icon: sc_static("images/icons/account.png")
        }
      ],

      itemTitleKey: 'title',
      itemValueKey: 'value',
      itemIconKey: 'icon',
    
      userDefaultKey: "mainPane",
      nowShowing: 'Powerforce.rosterPage.containerView'

    })//end tabs
    
  })// end mainPane

});// end mainPage
