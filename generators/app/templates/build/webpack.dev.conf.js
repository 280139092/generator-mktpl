var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin()
  ]
})

// add hot-reload related code to entry chunks
Object.keys(devWebpackConfig.entry).forEach(function (name) {
  devWebpackConfig.entry[name] = ['./build/dev-client'].concat(devWebpackConfig.entry[name])
  // https://github.com/ampedandwired/html-webpack-plugin
  devWebpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: name+'.html',
    template: 'html/'+name+'.html',
    chunks: [name],
    inject: true
  }));
})

module.exports = devWebpackConfig
