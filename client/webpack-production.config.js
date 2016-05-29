var WebpackStrip = require('strip-loader');
var path = require('path');
var devConfig = require('./webpack.config.js');
var stripLoader = {
  "test": [/.js$/,/.jsx$/],
  "include":[
    path.resolve(__dirname, "entry"),
    path.resolve(__dirname, "../server/imports/common")
  ],
  "loader":WebpackStrip.loader('console.log','debug')
};
devConfig.module.loaders.push(stripLoader);
module.exports = devConfig;

// TODO
// production bundle warning React
// http://dev.topheman.com/make-your-react-production-minified-version-with-webpack/
