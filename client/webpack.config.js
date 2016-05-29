var path = require('path');
// var webpack = require("webpack");
// This loads the meteor client files from .meteor/local so that it can be used in client applications
// without running meteor or needing the meteor context
var MeteorImportsPlugin = require('meteor-imports-webpack-plugin');
// we will create a separate bundle for css
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//Automatically prefix vendor prefixes to CSS
var autoprefixer = require('autoprefixer');

module.exports = {
    "entry" : {"app":['./src/main.js','./src/globals.js']},
    "output": {
        "path": path.resolve('./build'),
        "publicPath" :"/",
        "filename": '[name].js'
    },
    "externals": [],
    "plugins": [
        new MeteorImportsPlugin({
            ROOT_URL: 'http://localhost:3000/',
            DDP_DEFAULT_CONNECTION_URL: 'http://localhost:3000/',
            PUBLIC_SETTINGS: {},
            meteorFolder: '../server',
            meteorEnv: {
                NODE_ENV: 'development'
            },
            exclude: ['ecmascript']
        }),
        new ExtractTextPlugin('style.css')
    ],
    "module": {
        "noParse": [/libphonenumber.js$/],
        // "preLoaders" : [{
        //     "test": [/.js$/,/.jsx$/],
        //     "include":[
        //       path.resolve(__dirname, "entry")
        //       // ,
        //       // path.resolve(__dirname, "../server/imports/common")
        //     ],
        //     "loader":"jshint-loader"
        // }],
        "loaders": [{
            "test": require.resolve("react"),
            "loader": "expose-loader?React"
        }, {
            "test": /\.(js|jsx)$/,
            "loader": require.resolve("babel-loader"),
            "include": [path.resolve(__dirname, "src"), path.resolve(__dirname, "../server/lib")],
            "query": {
                "presets": [
                    require.resolve("babel-preset-es2015"),
                    require.resolve("babel-preset-stage-2"),
                    require.resolve("babel-preset-stage-0"),
                    require.resolve("babel-preset-react")
                ],
                "plugins": [
                    require.resolve("babel-plugin-react-require"),
                    require.resolve("babel-root-slash-import"),
                    require.resolve("babel-plugin-transform-decorators-legacy"),
                    require.resolve("babel-plugin-add-module-exports")
                ],
                "compact": false
            }
        }, {
            "test": /\.css$/,
            "exclude":/react-select/,
            "loader": ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader")
        },
        // Global CSS
        // regular 'global' css or pre-compiled.
        // as of now, only react-select needs this
        {
            "test": /\.css$/,
            "include":/react-select/,
            "loader": ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
        },

        {
            "test": /\.scss$/,
            "exclude":/node_modules/,
            "loader": ExtractTextPlugin.extract("style-loader","css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader")
        }, {
            "test": /\.html$/,
            "exclude":/node_modules/,
            "loader": "html"
        }, {
            "test": /\.json$/,
            "include": [path.resolve(__dirname, "entry"), path.resolve(__dirname, "../server/imports/common")],
            "loader": require.resolve("json-loader")
        }, {
            "test": /\.(png|jpg|ttf|svg)$/,
            "exclude":/node_modules/,
            // base64 encode the image and inline if size is less than the limit
            "loader": "url-loader?limit=8182"
        }, {
            "test": /\.eot/,
            "loader": 'url-loader?limit=8182&mimetype=application/vnd.ms-fontobject'
        }, {
            "test": /\.woff2(\?\S*)?$/,
            "loader": 'url-loader?limit=8182&mimetype=application/font-woff2'
        }, {
            "test": /\.woff/,
            "loader": 'url-loader?limit=8182&mimetype=application/font-woff'
        }, {
            "test": /\.ttf/,
            "loader": 'url-loader?limit=8182&mimetype=application/font-ttf'
        }]
    },
    //Automatically resove, import 'abc' [abc can be jsx or js], not allowing for json, css, scsss etc
    "resolve": {
        "extensions": ["", ".js", ".jsx"]
    },
    "postcss": function() {
        return {
            "defaults": [
              autoprefixer({"browsers": ["last 2 versions"]})
            ]
        };
    }

}
