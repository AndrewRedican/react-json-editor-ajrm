const developmentEnvironments = ['development', 'test'];
const { BABEL_ENV } = process.env;

console.log('Running Babel ...', { BABEL_ENV });

const moduleSystem = (BABEL_ENV && BABEL_ENV.startsWith('modules:')) ? BABEL_ENV.substring('modules:'.length) : 'es';

// For the ES configuration only transpile react to valid JavaScript.
// For commonjs transpile to old JS versions.
const presets  = [
  ['@babel/preset-typescript', {
    allExtensions: true,
    isTSX: true
  }],
  '@babel/preset-react'
];
if (moduleSystem !== 'es') {
  presets.splice(0, 0,
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
    }]
  );
}

// The ES system does not polyfill etc, while the others do.
const transformOptions = {
  helpers: true,
  useESModules: moduleSystem === 'es'
};

module.exports = {
  presets,
  plugins: [
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-proposal-object-rest-spread',
    'babel-plugin-extensible-destructuring',

    // Stage 0
    ['@babel/plugin-transform-runtime', transformOptions],

    // Stage 1

    // Stage 2

    // Stage 3
    ['@babel/plugin-proposal-class-properties', { loose: true }],
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
