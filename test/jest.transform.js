const config = require('../babel.config');
const babel = require('babel-jest').default;

module.exports = babel.createTransformer(config);