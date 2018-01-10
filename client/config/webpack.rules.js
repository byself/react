
const rules = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components|public)/,
    loader: "babel-loader",
    query: {
      presets: ["es2015", "react"],
      plugins: [
        'transform-runtime',
        'transform-decorators-legacy',
        'transform-class-properties',
        'react-hot-loader/babel',
        'transform-object-rest-spread'
      ],
      babelrc: false
    }
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: "file-loader"
  },
  {
    test: /\.(woff|woff2)$/,
    exclude: /(node_modules|bower_components)/,
    loader: "url-loader?prefix=font/&limit=5000"
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: "url-loader?limit=10000&mimetype=application/octet-stream"
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: "url-loader?limit=10000&mimetype=image/svg+xml&name=assets/images/[name].[ext]"
  },
  {
    test: /\.gif/,
    exclude: /(node_modules|bower_components)/,
    loader: "url-loader?limit=10000&mimetype=image/gif&name=assets/images/[name].[ext]"
  },
  {
    test: /\.jpg/,
    exclude: /(node_modules|bower_components)/,
    loader: "url-loader?limit=10000&mimetype=image/jpg&name=assets/images/[name].[ext]"
  },
  {
    test: /\.png/,
    exclude: /(node_modules|bower_components)/,
    loader: "url-loader?limit=10000&mimetype=image/png&name=assets/images/[name].[ext]"
  }
];
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// local css modules
rules.push({
  test: /[\/\\]src[\/\\].*\.css/,
  exclude: /(node_modules|bower_components|public)/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader'
  })
});
// local scss modules
rules.push({
  test: /[\/\\]src[\/\\].*\.scss/,
  exclude: /(node_modules|bower_components|public)/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader!postcss-loader!sass-loader'
  })
});
// less modules
rules.push({
  test: /[\/\\]src[\/\\].*\.less/,
  exclude: /(node_modules|bower_components|public)/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader!postcss-loader!less-loader'
  })
});
// global css files
rules.push({
  test: /[\/\\](node_modules|global|public)[\/\\].*\.css$/,
  loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
});
module.exports = rules;
