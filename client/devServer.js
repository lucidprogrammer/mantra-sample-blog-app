#!/usr/bin/env node
var WebpackDevServer = require("webpack-dev-server");
var HtmlWebpackPlugin = require('html-webpack-plugin');
// -d --hot --inline --content-base build/

// If you are not using html-webpack-plugin use an index.html like the following in the build directory
// <html>
//     <head>
//         <meta charset="utf-8">
//         <link rel="stylesheet" href="style.css">
//     </head>
//     <body>
//         <script type="text/javascript" src="app.js" charset="utf-8"></script>
//         <div id="root"></div>
//     </body>
// </html>

var webpack = require("webpack");
var path = require('path');
var config = require("./webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin()
  ,new HtmlWebpackPlugin()
);
// IF you are struggling with a difficult problem, uncomment the following, (increases build speed though)
config['devtool'] = 'source-map';
config['debug'] = true;
var request = require('request');
server = new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  hot: true,
  stats: {colors: true}
});
// https://github.com/reactjs/react-router/issues/676
server.app.use(function pushStateHook(req, res, next) {
  var ext = path.extname(req.url);
  if ((ext === '' || ext === '.html') && req.url !== '/') {
    req.pipe(request(
      // localURL
      'http://localhost:8080'
    )).pipe(res);
  } else {
    next();
  }
});
server.listen(8080, "localhost", function() {});


// remove push state if not needed later
