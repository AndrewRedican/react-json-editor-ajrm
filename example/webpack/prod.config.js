const merge      = require('webpack-merge');
const baseConfig = require('./base.config.js');

let path;

path = '';
path = __filename,
path = path.split('\\');
path.splice(-2, 2);
path.push('public');
path = path.join('\\');

/*
  TO DO:
  
  
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  const baseConfig = require('./base.config.js');

*/

module.exports = merge(baseConfig, {
  output: {
    path: path,
    publicPath: '/',
    filename: 'bundle.js'
  }
});


/*

  TO DO:
  {
    ...
    plugins: [
      // Extract imported CSS into own file
      new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
      // Minify JS
      new UglifyJsPlugin({
        sourceMap: false,
        compress: true,
      }),
      // Minify CSS
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
    ],
    ...
}

*/