const path = require('path');

module.exports = {
  entry: [
    './src/index.js'
  ],

  output: {
    path: path.resolve('build/'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devtool: 'eval',

  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
