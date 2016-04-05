var express = require('express');
var path = require('path');
var webpack = require('webpack');
var app = express();

var isDevelopment = (process.env.NODE_ENV !== 'production');
var staticPath = path.resolve(__dirname, 'public');

app.use(express.static(staticPath))
  . get("/", function(req, res){
    res.sendFile('index.html',{
      root:staticPath
    });
    })
    .listen(process.env.PORT || 8080, function(err){
      if(err){console.log(err)};
      console.log("Listening at 8080");
    });

if (isDevelopment) {
  var config = require('./webpack.config');
  var WebpackDevServer = require('webpack-dev-server');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
  }).listen(3000, 'localhost', function (err, result) {
    if (err) { console.log(err) }
    console.log('Listening at localhost:3000');
  });
}
