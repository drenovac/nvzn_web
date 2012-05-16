/*globals global require __dirname BT */

require('blossom/buildtools'); // adds the SC and BT namespaces as globals

var path = require('path');

var nvzn = BT.Project.create({
  "api": BT.Proxy.create({
    proxyHost: 'www.roster-me.com.au',
    proxyPort: 9292,
    proxyPrefix: '/api'
  }),
  "nvzn": BT.App.create({
    frameworks: 'blossom'.w(),
    // frameworks: 'foundation datastore application'.w(),
    sourceTree: path.join(__dirname, 'nvzn')
  }),
  "blossom": require('blossom')
  // "foundation": require('blossom/foundation'),
  // "datastore": require('blossom/datastore'),
  // "application": require('blossom/application')
});

// project.accept(BT.LoggingVisitor.create());

nvzn.serve();

//BT.Server.create({
//  nvzn: nvzn
//});