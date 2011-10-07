Nvzn.appController = SC.ObjectController.create(
{
  loginInput: '',
  passInput: '',
  
  login: function(){
    try{
      // var login = this.get('loginInput');
      // if ( login == null || username == '') {
      //   throw SC.Error.desc('Login is required');
      // }
      
      SC.routes.set('location', "mainPage/mainPane");
    }
    catch (err) {
      // Set Error
      this.set('errorMessage', err);
      return NO;
    }
  },
  
  logout: function(){
    SC.routes.set('location', "");
  }

}) ;
