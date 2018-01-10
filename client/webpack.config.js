
const path = require('path');
const webpack = require('webpack');

/**
 * 影响是否对文件进行压缩，是否在文件名中附加hash code
 * @type {boolean}
 */
console.log(process.env.NODE_ENV)
const isDebug = (process.env.NODE_ENV == 'development');

/**
 * 设置全局变量，供其他自定义模块使用
 */
global.isDebug || (global.isDebug = isDebug);

/**
 * webpack 规则配置，loader设置
 */
const rules = require('./config/webpack.rules');
/**
 * webpack 插件配置
 */
const plugins = require('./config/webpack.plugins');


module.exports = {

  entry: {
    "index": path.resolve(__dirname, 'src/modules/index')
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true,
    disableHostCheck: true
  },

  output: {
    filename: isDebug ? 'js/[name].js' : 'js/[name].[chunkhash:5].js',
    chunkFilename: isDebug ? '[name].chunk.js' : '[name].[chunkhash:5].chunk.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  /**
   * loaders
   */
  module: {
    strictExportPresence: true,
    rules: rules
  },

  /**
   * plugins
   */
  plugins: plugins
}
