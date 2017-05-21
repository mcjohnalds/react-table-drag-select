var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './example/entry.js',
  output: {
    path: __dirname + '/docs',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // TODO: Do I need this line?
        use: 'babel-loader' 
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // Make NODE_ENV available to js
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HTMLWebpackPlugin({title: 'react-table-drag-select demo'})
  ].concat(process.env.NODE_ENV === 'production' ?
    [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ] : []
  )
};
