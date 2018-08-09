const { BABEL_ENV } = process.env;

console.log("Running Babel ...", { BABEL_ENV });

const moduleSystem = (BABEL_ENV && BABEL_ENV.startsWith('modules:')) ? BABEL_ENV.substring("modules:".length) : "es";

// For the ES configuration only transpile react to valid JavaScript.
// For commonjs transpile to old JS versions.
const presets = moduleSystem === "es"
  ? ['@babel/preset-react']
  : [
    ['@babel/preset-env', {
      targets: {
        ie: 11,
        edge: 14,
        firefox: 45,
        chrome: 49,
        safari: 10,
        node: '6.11',
      },
      modules: moduleSystem,
    }],
    '@babel/preset-react'
  ];

// The ES system does not polyfill etc, while the others do.
const transformOptions = moduleSystem === "es"
  ? {
    helpers: true,
    useESModules: true
  }
  : {
    helpers: true,
    useESModules: false
  };

module.exports = {
  presets,
  plugins: [
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-proposal-object-rest-spread',
    'babel-plugin-extensible-destructuring',
    ['@babel/plugin-transform-runtime', transformOptions]
  ],
  env: {
    production: {
      plugins: [
        // Optimize constant react elements in the production build. (Makes debugging harder, so skip this in development)
        'transform-react-constant-elements',
      ],
      ignore: ['test/*']
    }
  },
  ignore: ['scripts/*.js']
};
