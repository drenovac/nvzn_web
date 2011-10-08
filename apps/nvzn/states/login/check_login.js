Nvzn.CHECK_LOGIN = Ki.State.design({
  enterState: function() {
    // TODO: Check to see if we are already logged in.

    // For now, just say we're not logged in:
    this.gotoState('SHOW_LOGIN');
  },

  loadUser: function() {
    if (user.get('isEmployee')) {

    }
  }

});