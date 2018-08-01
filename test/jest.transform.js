module.exports = require('babel-jest').createTransformer({
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
    ],
    'plugins': [
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-proposal-object-rest-spread',
        'babel-plugin-extensible-destructuring',
        ['@babel/plugin-transform-runtime',{
            'helpers': true,
            'polyfill': true,
            'useBuiltIns': false,
            'useESModules': true
        }]
    ]
  });