const { BABEL_ENV } = process.env;

console.log("Running Babel ...", { BABEL_ENV });

const moduleSystem = (BABEL_ENV && BABEL_ENV.startsWith('modules:')) ? BABEL_ENV.substring("modules:".length) : "es";

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: 11,
          edge: 14,
          firefox: 45,
          chrome: 49,
          safari: 10,
          node: '6.11',
        },
        modules: moduleSystem === "es" ? false : moduleSystem,
      },
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-proposal-object-rest-spread',
    ['@babel/plugin-transform-runtime', { polyfill: false, useBuiltIns: true }],
  ],
  env: {
    development: {
      plugins: [
        [
          'module-resolver',
          {
            alias: {
              modules: './modules',
            },
          }
        ],
      ],
    },
    production: {
      plugins: [
        'transform-react-constant-elements',
      ],
      ignore: ['test/*'],
    },
  },
  ignore: ['scripts/*.js'],
};
