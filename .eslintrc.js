module.exports = {
  'parser': 'babel-eslint',
  'extends': [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-perf/recommended',
    'standard',
    'standard-react',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended'
  ],
  'plugins': [
    'babel',
    'import',
    'jsx-a11y',
    'promise',
    'react',
    'react-perf',
    'standard',
    'no-inferred-method-name',
    'react-functional-set-state',
    'jest'
  ],
  'env': {
    'node': true,
    'browser': true,
    'commonjs': true,
    'worker': true,
    'jest': true,
    'es6': true,
    'jest/globals': true
  },
  'globals': {
    '__DEV__': false,
    '__PROD__': false,
    '__PLAYER_DEBUG__': false,
    '__BASENAME__': false
  },
  'settings': {
    'ecmascript': 6,
    'import/resolver': 'webpack',
    'react': {
      // 'createClass': 'createReactClass', // Regex for Component Factory to use,
                                         // default to 'createReactClass'
      'pragma': 'React',  // Pragma to use, default to 'React'
      'version': '^16.5.2', // React version, default to the latest React stable release
      // 'flowVersion': '0.53' // Flow version
    }
  },
  'rules': {
    'camelcase': 'off',
    // 'template-curly-spacing' : 'off',
    // indent : 'off',
    'react-functional-set-state/no-this-state-props': 2,
    'no-void': 2,
    'no-restricted-globals': 2,
    'no-use-before-define': 2,
    'func-names': 1,
    'no-unused-vars': 2,
    'guard-for-in': 2,
    'no-restricted-syntax': 2,

    'jsx-a11y/label-has-for': 'off',
    'no-console': 'off',
    // 'react/no-typos': 'off',
    'max-len': 'off',
    'no-nested-ternary': 'off',
    // 'camelcase': [
    //   2,
    //   {
    //     'properties': 'never'
    //   }
    // ],
    'react-redux/prefer-separate-component-file': 'off',
    'react/destructuring-assignment': 'off',
    'babel/no-invalid-this': 1,
    'semi': 0,
    'spaced-comment': 0,
    'brace-style': 0,
    'no-trailing-spaces': 0,
    'import/default': 2,
    'import/no-unresolved': [
      2,
      {
        'commonjs': true,
        'amd': true
      }
    ],
    'import/named': 2,
    'import/namespace': 2,
    'import/export': 2,
    'import/no-duplicates': 2,
    'import/imports-first': 2,
    'import/prefer-default-export': 'off',

    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  },
  'parserOptions': {
    'sourceType': 'module'
  }
}
