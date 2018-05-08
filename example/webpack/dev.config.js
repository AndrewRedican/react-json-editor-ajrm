const merge      = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
});

/*

Note to Self:   December 9, 2017
These settings never worked for circumvention Same-Origin-Policy Chrome. 
First relying on chrome extension:
Now using firebase hosting

...
devServer: {
  ...
  headers: {
    host: 'localhost', 
    port: 8080,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
    'Access-Control-Allow-Credentials': 'true',
    'Vary': 'Origin'
  }
  ...
}
...

*/