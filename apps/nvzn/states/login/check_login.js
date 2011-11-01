Nvzn.CHECK_LOGIN = SC.State.design({
  enterState: function() {
    // TODO: Check to see if we are already logged in.

    // For now, just say we're not logged in:
    this.gotoState('SHOW_LOGIN');

//    var controller = Nvzn.loginController;
//    controller.set('content', SC.Object.create({
//      "id":12450,
//      "first_name": "EDDIN",
//      "last_name": "BARROW",
//      "name": "EDDIN BARROW",
//      "role":"employee"
//    }));
//    this.gotoState('APP');

  },

  loadUser: function() {
    if (user.get('isEmployee')) {

    }
  }

});