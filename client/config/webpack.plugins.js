/**
 */

const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const plugins = [
  new WebpackCleanupPlugin(),
];

// const TEMPLATE_PATH = './src/templates/template-' + (process.env.NODE_ENV === "production" ? "prod" : "dev") + '.html';
const TEMPLATE_PATH = './src/templates/template.html';

//plugins.push(new webpack.ProvidePlugin({
//    'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
//}));


if (!isDebug) {
    plugins.push(new ExtractTextPlugin({
        filename: './css/[name].[contenthash:5].css',
        allChunks: true
    }));
    plugins.push(new UglifyJSPlugin({
        compress: {
            warnings: false,
            screw_ie8: true,
            drop_console: true,
            drop_debugger: true
        }
    }));

} else {

  plugins.push(new ExtractTextPlugin({
    filename: './css/[name].css',
    allChunks: true
  }));

  plugins.push(new webpack.NoEmitOnErrorsPlugin());
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

plugins.push(
    new HtmlWebpackPlugin({
        template: TEMPLATE_PATH,
        filename: 'index.html',
        chunks: ['index'],
        title: '首页'
    })
)

// modules.forEach((m) => {
//   let chunkName = m.src.match(REG_MODULE)[1];
//   plugins.push(
//     new HtmlWebpackPlugin({
//       template: TEMPLATE_PATH,
//       chunks: [chunkName],
//       filename: chunkName + '.html',
//       title: m.title
//     })
//   );
// });

module.exports = plugins;
