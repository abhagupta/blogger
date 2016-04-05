var webpack = require("webpack");
var path = require("path");

module.exports = {
  devtool: 'source-map',
  entry:[
    './src/index'
  ],
  output:{
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins:[
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress:{
        warnings:false
      }
    })
  ],

  module:{
    loaders:[{
      exclude: /node_modules/,
      loader:'babel'
    }]
  },

  resolve:{
    extensions:['', '.js', '.jsx']
  }
}
