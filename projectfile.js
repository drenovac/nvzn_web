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

  "static": BT.Directory.create({
    // no sc_static() support yet, so give our image a nice and easy path
    "envizion-logo.png": BT.File.create({
      sourcePath: path.join(__dirname, "nvzn/images/envizion-logo.png"),
      mimeType: 'image/png'
    }),
    "background-dark.png": BT.File.create({
      sourcePath: path.join(__dirname, "nvzn/images/NSTexturedFullScreenBackgroundColor.png"),
      mimeType: 'image/png'
    }),
    "background-light.png": BT.File.create({
      sourcePath: path.join(__dirname, "nvzn/images/NSLinenBackgroundPattern.png"),
      mimeType: 'image/png'
    }),
    "paper1.png": BT.File.create({
      sourcePath: path.join(__dirname, "nvzn/images/paper1.png"),
      mimeType: 'image/png'
    }),
    "paper2.png": BT.File.create({
      sourcePath: path.join(__dirname, "nvzn/images/paper2.png"),
      mimeType: 'image/png'
    })
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