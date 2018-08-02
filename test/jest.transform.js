let babel = require('../babel.config');

babel.plugins.push(
    ["@babel/plugin-transform-modules-commonjs", {
        strictMode: false
    }]
);

module.exports = require('babel-jest').createTransformer(babel);