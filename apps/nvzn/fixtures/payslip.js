// ==========================================================================
// Project:   Nvzn.Payslip Fixtures
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

sc_require('models/payslip');

Nvzn.Payslip.FIXTURES = [

  { guid: 'payslip-1',
    employee: 'John Smith',
    from: '1 Jan 2011',
    to: '14 Jan 2011',
    paidAt: '15 Jan 2011',
    tax: '$50',
    'super': '$50',
    gross: '$700' },

  { guid: 'payslip-2',
    employee: 'John Smith',
    from: '15 Jan 2011',
    to: '29 Jan 2011',
    paidAt: '30 Jan 2011',
    tax: '$50',
    'super': '$50',
    gross: '$700' },

  { guid: 'payslip-3',
    employee: 'John Smith',
    from: '1 Feb 2011',
    to: '14 Feb 2011',
    paidAt: '15 Jan 2011',
    tax: '$50',
    'super': '$50',
    gross: '$700' }

];
