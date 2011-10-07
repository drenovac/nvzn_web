Nvzn.main = function main() {

  SC.routes.add(':pageName/:paneName', Nvzn.routes, 'route');
  SC.routes.add(':', Nvzn.routes, 'route');
  
  Nvzn.getPath('loginPage.loginPane').append() ;
  
  var rosters = Nvzn.store.find(Nvzn.Roster);
  Nvzn.rosterController.set('content', rosters);
  
  var time = ["All", "Today", "This Week", "Next Week"];
  Nvzn.sidebarController.set('time', time);

  var place = ["All", "Western Creek", "Sydney CBD", "Malabar", "International Airport"];
  Nvzn.sidebarController.set('place', place);
  
  var account_list = ["Personal detail", "Address", "Bank details"];
  Nvzn.sidebarController.set('account_list', account_list);

  Nvzn.yearsController.set('content', '2011 2010 2009 2008'.w());
  Nvzn.payslipsController.set('content', Nvzn.store.find(Nvzn.Payslip));

} ;

function main() { Nvzn.main(); }
