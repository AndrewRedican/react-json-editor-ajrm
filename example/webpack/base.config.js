module.exports = {
    entry: [
      'babel-polyfill',
      './src/index.js'
    ],
    module: {
      rules: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['react', 'babel-preset-env'] }},{
          test: /\.json$/,
          loader: 'json-loader'
        }]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
};