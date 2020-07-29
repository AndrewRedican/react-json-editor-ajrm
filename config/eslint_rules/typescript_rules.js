// Typescript Rules
module.exports = {
  '@typescript-eslint/adjacent-overload-signatures': 2,
  '@typescript-eslint/ban-ts-comment': 1,
  '@typescript-eslint/ban-types': 2,
  '@typescript-eslint/brace-style': [0, '1tbs', {
    allowSingleLine: true
  }],
  '@typescript-eslint/comma-spacing': [0, {
    before: false,
    after: true
  }],
  '@typescript-eslint/dot-notation': [2, {
    allowKeywords: true,
    allowPattern: '',
    allowPrivateClassPropertyAccess: false
  }],
  '@typescript-eslint/explicit-function-return-type': 0,
  '@typescript-eslint/explicit-module-boundary-types': 0,
  '@typescript-eslint/func-call-spacing': [0, 'never'],
  '@typescript-eslint/indent': [0, 2, {
    SwitchCase: 1,
    VariableDeclarator: 1,
    outerIIFEBody: 1,
    FunctionDeclaration: {
      parameters: 1,
      body: 1
    },
    FunctionExpression: {
      parameters: 1,
      body: 1
    },
    CallExpression: {
      arguments: 1
    },
    ArrayExpression: 1,
    ObjectExpression: 1,
    ImportDeclaration: 1,
    flatTernaryExpressions: false,
    ignoredNodes: [
      'JSXElement',
      'JSXElement > *',
      'JSXAttribute',
      'JSXIdentifier',
      'JSXNamespacedName',
      'JSXMemberExpression',
      'JSXSpreadAttribute',
      'JSXExpressionContainer',
      'JSXOpeningElement',
      'JSXClosingElement',
      'JSXFragment',
      'JSXOpeningFragment',
      'JSXClosingFragment',
      'JSXText',
      'JSXEmptyExpression',
      'JSXSpreadChild'
    ],
    ignoreComments: false,
    offsetTernaryExpressions: false
  }],
  '@typescript-eslint/keyword-spacing': [0, {
    before: true,
    after: true,
    overrides: {
      return: {
        after: true
      },
      throw: {
        after: true
      },
      case: {
        after: true
      }
    }
  }],
  '@typescript-eslint/lines-between-class-members': [2, 'always', {
    exceptAfterSingleLine: true
  }],
  '@typescript-eslint/member-delimiter-style': 0,
  '@typescript-eslint/naming-convention': [2,
    {
      selector: 'variable',
      format: [
        'camelCase',
        'PascalCase',
        'UPPER_CASE'
      ]
    },
    {
      selector: 'function',
      format: [
        'camelCase',
        'PascalCase'
      ]
    },
    {
      selector: 'typeLike',
      format: [
        'PascalCase'
      ]
    }
  ],
  '@typescript-eslint/no-array-constructor': 2,
  '@typescript-eslint/no-dupe-class-members': 2,
  '@typescript-eslint/no-empty-function': [2, {
    allow: [
      'arrowFunctions',
      'functions',
      'methods'
    ]
  }],
  '@typescript-eslint/no-empty-interface': 2,
  '@typescript-eslint/no-explicit-any': 1,
  '@typescript-eslint/no-extra-non-null-assertion': 2,
  '@typescript-eslint/no-extra-parens': [0, 'all', {
    conditionalAssign: true,
    nestedBinaryExpressions: false,
    returnAssign: false,
    ignoreJSX: 'all',
    enforceForArrowConditionals: false
  }],
  '@typescript-eslint/no-extra-semi': 0,
  '@typescript-eslint/no-implied-eval': 2,
  '@typescript-eslint/no-inferrable-types': 2,
  '@typescript-eslint/no-magic-numbers': [0, {
    ignore: [],
    ignoreArrayIndexes: true,
    enforceConst: true,
    detectObjects: false
  }],
  '@typescript-eslint/no-misused-new': 2,
  '@typescript-eslint/no-namespace': 2,
  '@typescript-eslint/no-non-null-asserted-optional-chain': 2,
  '@typescript-eslint/no-non-null-assertion': 1,
  '@typescript-eslint/no-this-alias': 2,
  '@typescript-eslint/no-throw-literal': 2,
  '@typescript-eslint/no-unsafe-assignment': 2,
  '@typescript-eslint/no-unsafe-call': 1,
  '@typescript-eslint/no-unsafe-member-access': 1,
  '@typescript-eslint/no-unused-expressions': [2, {
    allowShortCircuit: false,
    allowTernary: false,
    allowTaggedTemplates: false
  }],
  '@typescript-eslint/no-unused-vars': [1, {
    vars: 'all',
    args: 'after-used',
    ignoreRestSiblings: true
  }],
  '@typescript-eslint/no-use-before-define': [2, {
    functions: true,
    classes: true,
    variables: true
  }],
  '@typescript-eslint/no-useless-constructor': 1,
  '@typescript-eslint/no-var-requires': 0,
  '@typescript-eslint/prefer-as-const': 2,
  '@typescript-eslint/prefer-namespace-keyword': 2,
  '@typescript-eslint/prefer-includes': 2,
  '@typescript-eslint/prefer-regexp-exec': 2,
  '@typescript-eslint/prefer-string-starts-ends-with': 2,
  '@typescript-eslint/quotes': [0, 'single', {
    avoidEscape: true
  }],
  '@typescript-eslint/semi': [0, 'always'],
  '@typescript-eslint/space-before-function-paren': [0, {
    anonymous: 'always',
    named: 'never',
    asyncArrow: 'always'
  }],
  '@typescript-eslint/triple-slash-reference': 2,
  '@typescript-eslint/type-annotation-spacing': 0,
  '@typescript-eslint/unbound-method': 1
}