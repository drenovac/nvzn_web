Nvzn.OHS_REPORT = Ki.State.design({
  initialSubstate: 'OHS_REPORT_SHOW',

  enterState: function() {
//    console.log('APP.OHS_REPORT');
    Nvzn.getPath('mainPage.submit').set('title', 'Submit Report');
    Nvzn.getPath('mainPage.submit').set('isVisible', YES);
    Nvzn.getPath('mainPage.header.titleView').set('value', "OHS Concern/Hazard Report");
  },

  exitState: function() {
    Nvzn.getPath('mainPage.header.titleView').set('value', "");
  },

  OHS_REPORT_SHOW: Ki.State.design({
    enterState: function() {
      console.log('APP.OHS_REPORT_SHOW');
      if (Nvzn.editScope) Nvzn.editScope.destroy();
      var S = Nvzn.editScope = Nvzn.store.chain(),
        employee = Nvzn.loginController,
        form = S.createRecord(Nvzn.Form, {
        surname: employee.get('lastName'),
        givenName: employee.get('firstName')
      }, (new Date().getTime()));
      Nvzn.formController.set('content', form);
    }
  })

});