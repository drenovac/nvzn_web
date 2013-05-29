Nvzn.PAYSLIPS = Ki.State.design({
  enterState: function() {
    Nvzn.getPath('mainPage.header.titleView').set('value', "Payslips");
  },

  exitState: function() {
    console.log('Payslips Exit');
    Nvzn.getPath('mainPage.header.titleView').set('value', "");
  }

});