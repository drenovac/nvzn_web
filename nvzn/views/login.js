sc_require('views/view');

Nvzn.loginPanel = SC.LayoutSurface.extend({
  layout: { height: 208, width: 350, centerX:0, centerY: 0 },
  backgroundColor: 'blue',

  init: function() {
    sc_super();
    var titleBar = Nvzn.titleBar;
    titleBar.set('title', "Login");

    var form = Nvzn.View.create({
      layout: { top: 21, left: 0, right: 0, bottom:0 },
      clearBackground: true,
      childLayers: 'logo errorMessage nameLabel nameField pwLabel pwField submitButton'.w(),

      logo: SC.Layer.extend({
        layout: {width: 200, height: 61, top: 20, centerX: 0 },
        render: function(ctx) {
          ctx.drawImage(Nvzn.images['logo'], 0, 0);
        }
      }),

      errorMessage: SC.LabelLayer.extend({
        layout: { top: 75, left: 30, height: 24, width: 275 },
        color: "#E60B3E",
        value: '',
        valueBinding: 'Nvzn.loginController.errorMessage'
      }),

      nameLabel: SC.LabelLayer.extend({
        layout: { top: 100, left: 30, height: 24, width: 72 },
        value: 'Username:'
      }),
      nameField: SC.TextFieldWidget.extend({
        layout: { left: 120, top: 96, width: 200, height: 22 },
        isSingleLine: YES,
        applyImmediately: YES,
        hint: 'site or employee',
        value: "",
        valueBinding: 'Nvzn.loginController.loginInput'
      }),

      pwLabel: SC.LabelLayer.extend({
        layout: { top: 130, left: 30, height: 24, width: 72 },
        value: 'Password:'
      }),
      pwField: SC.TextFieldWidget.extend({
        layout: { left: 120, top: 126, width: 200, height: 22 },
        value: "",
        applyImmediately: YES,
        isPassword: YES,
        valueBinding: 'Nvzn.loginController.passInput'
      }),

      submitButton: SC.ButtonWidget.extend({
        layout: { right: 30, bottom: 10, width: 80, height: 22 },
        supportFocusRing: YES,
        title: 'Login',
        target: 'Nvzn.statechart',
        action: 'submitLogin',
        theme: 'regular'
      })

    });
//    form.set('frame', SC.MakeRect(0, 20, 800, 300));

    this.get('subsurfaces').pushObjects([titleBar, form]);
  }

});

Nvzn.loginForm = SC.LayoutSurface.create({

  init: function() {
    sc_super();
    this.get('subsurfaces').pushObject(Nvzn.loginPanel.create());
  },

  didCreateElement: function(div) {
    // We don't want SC.View's implementation; don't call it.
    var style = div.style;
    style.backgroundImage = "url(/static/NSTexturedFullScreenBackgroundColor.png)";
    style.backgroundPosition = 'left top';
    style.backgroundRepeat = 'repeat';
  }
});