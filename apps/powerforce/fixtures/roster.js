// ==========================================================================
// Project:   Powerforce.Roster Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Powerforce */

sc_require('models/roster');

Powerforce.Roster.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

  { guid: 1,
    employee: "Glacomo Guillzoni",
    contact: "048726384",
    site_phone: "3878234", 
    location: 'Peldi' ,
    status: "Confirmed",
    start: "01/12/2010 09:00:00",
    end: "01/12/2010 18:00:00"},
  
  { guid: 2,
    employee: "Dwight Schrute",
    contact: "048726384",
    site_phone: "3234234",
    location: 'Sydney',
    start: "01/12/2010 09:00:00",
    end: "01/12/2010 18:00:00"},
    
  { guid: 3,
    employee: "Glacomo Guillzoni",
    contact: "048726384",
    site_phone: "3878234", 
    location: 'Peldi' ,
    status: "Confirmed",
    start: "01/12/2010 09:00:00",
    end: "01/12/2010 18:00:00"},

  { guid: 4,
    employee: "Dwight Schrute",
    contact: "048726384",
    site_phone: "3234234",
    location: 'Sydney',
    start: "01/12/2010 09:00:00",
    end: "01/12/2010 18:00:00"},
      
  { guid: 5,
    employee: "Glacomo Guillzoni",
    contact: "048726384",
    site_phone: "3878234", 
    status: "Rejected",
    location: 'Peldi' ,
    start: "01/12/2010 09:00:00",
    end: "01/12/2010 18:00:00"},

  { guid: 6,
    employee: "Dwight Schrute",
    contact: "048726384",
    site_phone: "3234234",
    location: 'Sydney',
    start: "01/12/2010 09:00:00",
    end: "01/12/2010 18:00:00"}
];