const LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
  entry: "./client/index.js",
  output: {
    path: __dirname + '/public',
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },

  plugins: [new LiveReloadPlugin({appendScriptTag: true})]
};
