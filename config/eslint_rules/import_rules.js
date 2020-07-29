// Import Rules
module.exports = {
  'import/default': 0,
  'import/dynamic-import-chunkname': [0, {
    importFunctions: [],
    webpackChunknameFormat: '[0-9a-zA-Z-_/.]+'
  }],
  'import/export': 2,
  'import/exports-last': 0,
  'import/extensions': [2, 'ignorePackages', {
    js: 'never',
    jsx: 'never',
    mjs: 'never'
  }],
  'import/first': 2,
  'import/group-exports': 0,
  'import/imports-first': 0,
  'import/max-dependencies': [0, {
    max: 10
  }],
  'import/named': 2,
  'import/namespace': 0,
  'import/newline-after-import': 2,
  'import/no-absolute-path': 2,
  'import/no-amd': 2,
  'import/no-anonymous-default-export': [0, {
    allowAnonymousClass: false,
    allowAnonymousFunction: false,
    allowArray: false,
    allowArrowFunction: false,
    allowLiteral: false,
    allowObject: false
  }],
  'import/no-commonjs': 0,
  'import/no-cycle': [2, {}],
  'import/no-default-export': 0,
  'import/no-deprecated': 0,
  'import/no-duplicates': 2,
  'import/no-dynamic-require': 2,
  'import/no-extraneous-dependencies': [0, {
    devDependencies: true,
    peerDependencies: true,
    optionalDependencies: false
  }],
  'import/no-internal-modules': [0, {
    allow: []
  }],
  'import/no-mutable-exports': 2,
  'import/no-named-as-default': 2,
  'import/no-named-as-default-member': 2,
  'import/no-named-default': 2,
  'import/no-named-export': 0,
  'import/no-namespace': 0,
  'import/no-nodejs-modules': 0,
  'import/no-relative-parent-imports': 0,
  'import/no-restricted-paths': 0,
  'import/no-self-import': 2,
  'import/no-unassigned-import': 0,
  'import/no-unresolved': [2, {
    caseSensitive: true,
    commonjs: true
  }],
  'import/no-unused-modules': [0, {
    ignoreExports: [],
    missingExports: true,
    unusedExports: true
  }],
  'import/no-useless-path-segments': [2, {
    commonjs: true
  }],
  'import/no-webpack-loader-syntax': 2,
  'import/order': [2, {
    groups: [
      ['builtin', 'external', 'internal']
    ]
  }],
  'import/prefer-default-export': 0,
  'import/unambiguous': 0
}