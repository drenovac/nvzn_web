Powerforce.main = function main() {

  SC.routes.add(':pageName/:paneName', Powerforce.routes, 'route');
  SC.routes.add(':', Powerforce.routes, 'route');
  
  Powerforce.getPath('loginPage.loginPane').append() ;
  
  var rosters = Powerforce.store.find(Powerforce.Roster);
  Powerforce.rosterController.set('content', rosters);
  
  var time = ["All", "Today", "This Week", "Next Week"];
  Powerforce.sidebarController.set('time', time);

  var place = ["All", "Western Creek", "Sydney CBD", "Malabar", "International Airport"];
  Powerforce.sidebarController.set('place', place);
  
  var account_list = ["Personal detail", "Address", "Bank details"];
  Powerforce.sidebarController.set('account_list', account_list);

  Powerforce.yearsController.set('content', '2011 2010 2009 2008'.w());
  Powerforce.payslipsController.set('content', Powerforce.store.find(Powerforce.Payslip));

} ;

function main() { Powerforce.main(); }
