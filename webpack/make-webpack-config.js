'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

var path = require('path');

var sassConfigStr = '!sass-loader?sourceMap';

var ROOT_PATH = path.resolve(__dirname, '../');
var NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules');
var SOURCE_PATH = path.resolve(ROOT_PATH, 'source');
var BUNDLES_PATH = path.join(ROOT_PATH, 'bundles/');


module.exports = (options) => {
    var config = {};
    var plugins = [];
    var preloaders = [];
    var loaders = [];
    var _OUTPUT = {
        path: BUNDLES_PATH,
        filename: 'bundle.js',
        publicPath: '/bundles/'
    };

    if (options.hotReloading) {
        plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );

        config.devtool = 'eval-source-map';
        config.devServer = {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            port: 4000,
            host: '0.0.0.0',
            headers: {'Access-Control-Allow-Origin': '*'}
        }
    }

    if (options.lint) {
        preloaders.push(
            {
                test: /\.es6?$/,
                loaders: ['eslint-loader'],
                include: [SOURCE_PATH],
                exclude: [NODE_MODULES_PATH]
            },
            {
                test: /\.jsx?$/,
                loaders: ['eslint-loader'],
                include: [SOURCE_PATH],
                exclude: [NODE_MODULES_PATH]
            }
        )
    }

    if (options.minimize) {
        plugins.push(
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {warnings: false},
                output: {comments: false} // https://github.com/webpack/webpack/issues/324
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.optimize.OccurenceOrderPlugin(true),
            new webpack.NoErrorsPlugin()
        );
    }

    return merge(config, {
        entry: {
            main: [
                'babel-polyfill',
                path.resolve(SOURCE_PATH, 'App.jsx')
            ]
        },
        output: _OUTPUT,
        resolve: {
            modulesDirectories: [NODE_MODULES_PATH]
        },
        module: {
            preLoaders: [].concat(preloaders),
            loaders: [
                {
                    test: /\.es6?$/,
                    loaders: ['babel-loader'],
                    include: [SOURCE_PATH],
                    exclude: [NODE_MODULES_PATH]
                },
                {
                    test: /\.jsx?$/,
                    loaders: ['babel-loader'],
                    include: [SOURCE_PATH],
                    exclude: [NODE_MODULES_PATH]
                },
                {
                    test: /\.(ttf|eot|svg|woff|png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "file-loader"
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?' + sassConfigStr),
                    exclude: [NODE_MODULES_PATH]
                },
                 {
                     test: /\.css/,
                     loader: 'style?sourceMap!css',
                     include: [NODE_MODULES_PATH]
                 }
            ].concat(loaders)

        },
        plugins: [
            new ExtractTextPlugin('bundle.css'),
            new webpack.DefinePlugin({
                'PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL)
            })
        ].concat(plugins),
        debug: options.debug
    })
};