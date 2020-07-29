// react Rules
module.exports = {
  'react/boolean-prop-naming': [0, {
    'message': '',
    'propTypeNames': ['bool', 'mutuallyExclusiveTrueProps'],
    'rule': '^(is|has)[A-Z]([A-Za-z0-9]?)+'
  }],
  'react/button-has-type': [2, {
    'button': true,
    'reset': false,
    'submit': true
  }],
  'react/default-props-match-prop-types': [2, {
    'allowRequiredDefaults': false
  }],
  'react/destructuring-assignment': [2, 'always'],
  'react/display-name': [1, {
    'ignoreTranspilerName': false
  }],
  'react/forbid-component-props': [0, {
    'forbid': []
  }],
  'react/forbid-dom-props': [0, {
    'forbid': []
  }],
  'react/forbid-elements': [0, {
    'forbid': []
  }],
  'react/forbid-foreign-prop-types': [1, {
    'allowInPropTypes': true
  }],
  'react/forbid-prop-types': [2, {
    'checkChildContextTypes': true,
    'checkContextTypes': true,
    'forbid': ['any']
  }],
  'react/function-component-definition': [0, {
    'namedComponents': 'function-expression',
    'unnamedComponents': 'function-expression'
  }],
  'react/jsx-boolean-value': [2, 'never', {
    'always': []
  }],
  'react/jsx-child-element-spacing': 0,
  'react/jsx-closing-bracket-location': [2, 'line-aligned'],
  'react/jsx-closing-tag-location': 2,
  'react/jsx-curly-brace-presence': [2, {
    'children': 'never',
    'props': 'never'
  }],
  'react/jsx-curly-newline': [2, {
    'multiline': 'consistent',
    'singleline': 'consistent'
  }],
  'react/jsx-curly-spacing': [2, 'always', {
    'allowMultiline': true,
    'spacing': {
	    'objectLiterals': 'never'
    }
  }],
  'react/jsx-equals-spacing': [2, 'never'],
  'react/jsx-filename-extension': [2, {
    'extensions': ['.jsx', '.tsx']
  }],
  'react/jsx-first-prop-new-line': [2, 'multiline-multiprop'],
  'react/jsx-fragments': [2, 'syntax'],
  'react/jsx-handler-names': [0, {
    'eventHandlerPrefix': 'handle',
    'eventHandlerPropPrefix': 'on'
  }],
  'react/jsx-indent': [2, 2],
  'react/jsx-indent-props': [2, 2],
  'react/jsx-key': 2,
  'react/jsx-max-depth': 0,
  'react/jsx-max-props-per-line': [2, {
    'maximum': 1,
    'when': 'multiline'
  }],
  'react/jsx-no-bind': [2, {
    'allowArrowFunctions': true,
    'allowBind': false,
    'allowFunctions': false,
    'ignoreDOMComponents': true,
    'ignoreRefs': true
  }],
  'react/jsx-no-comment-textnodes': 2,
  'react/jsx-no-duplicate-props': [2, {
    'ignoreCase': true
  }],
  'react/jsx-no-literals': [0, {
    'noStrings': true
  }],
  'react/jsx-no-script-url': [0, [
    {
      'name': 'Link',
      'props': ['to']
    }
  ]],
  'react/jsx-no-target-blank': [2, {
    'enforceDynamicLinks': 'always'
  }],
  'react/jsx-no-undef': 2,
  'react/jsx-no-useless-fragment': 0,
  'react/jsx-one-expression-per-line': [2, {
    'allow': 'single-child'
  }],
  'react/jsx-pascal-case': [2, {
    'allowAllCaps': true,
    'ignore': []
  }],
  'react/jsx-props-no-multi-spaces': 2,
  'react/jsx-props-no-spreading': [2, {
    'custom': 'ignore',
    'exceptions': [],
    'html': 'enforce'
  }],
  'react/jsx-sort-default-props': [0, {
    'ignoreCase': true
  }],
  'react/jsx-sort-prop-types': 0,
  'react/jsx-sort-props': [0, {
    'callbacksLast': false,
    'ignoreCase': true,
    'noSortAlphabetically': false,
    'reservedFirst': true,
    'shorthandFirst': false,
    'shorthandLast': false
  }],
  'react/jsx-space-before-closing': [0, 'always'],
  'react/jsx-tag-spacing': [2, {
    'afterOpening': 'never',
    'beforeClosing': 'allow',
    'beforeSelfClosing': 'always',
    'closingSlash': 'never'
  }],
  'react/jsx-uses-react': 2,
  'react/jsx-uses-vars': 2,
  'react/jsx-wrap-multilines': [2, {
    'arrow': 'parens-new-line',
    'assignment': 'parens-new-line',
    'condition': 'parens-new-line',
    'declaration': 'parens-new-line',
    'logical': 'parens-new-line',
    'prop': 'parens-new-line',
    'return': 'parens-new-line'
  }],
  'react/no-access-state-in-setstate': 2,
  'react/no-adjacent-inline-elements': 0,
  'react/no-array-index-key': 2,
  'react/no-children-prop': 2,
  'react/no-danger': 1,
  'react/no-danger-with-children': 2,
  'react/no-deprecated': 2,
  'react/no-did-mount-set-state': 0,
  'react/no-did-update-set-state': 2,
  'react/no-direct-mutation-state': 2,
  'react/no-find-dom-node': 2,
  'react/no-is-mounted': 2,
  'react/no-multi-comp': 0,
  'react/no-redundant-should-component-update': 2,
  'react/no-render-return-value': 2,
  'react/no-set-state': 0,
  'react/no-string-refs': 2,
  'react/no-this-in-sfc': 2,
  'react/no-typos': 2,
  'react/no-unescaped-entities': 2,
  'react/no-unknown-property': 2,
  'react/no-unsafe': 0,
  'react/no-unused-prop-types': [2, {
    'customValidators': [],
    'skipShapeProps': true
  }],
  'react/no-unused-state': 2,
  'react/no-will-update-set-state': 2,
  'react/prefer-es6-class': [2, 'always'],
  'react/prefer-read-only-props': 0,
  'react/prefer-stateless-function': [2, {
    'ignorePureComponents': true
  }],
  'react/prop-types': [2, {
    'customValidators': [],
    'ignore': [],
    'skipUndeclared': false
  }],
  'react/react-in-jsx-scope': 2,
  'react/require-default-props': [2, {
    'forbidDefaultForRequired': true
  }],
  'react/require-optimization': [0, {
    'allowDecorators': []
  }],
  'react/require-render-return': 2,
  'react/self-closing-comp': 2,
  'react/sort-comp': [2, {
    'groups': {
      'lifecycle': [
        'displayName',
        'propTypes',
        'contextTypes',
        'childContextTypes',
        'mixins',
        'statics',
        'defaultProps',
        'constructor',
        'getDefaultProps',
        'getInitialState',
        'state',
        'getChildContext',
        'getDerivedStateFromProps',
        'componentWillMount',
        'UNSAFE_componentWillMount',
        'componentDidMount',
        'componentWillReceiveProps',
        'UNSAFE_componentWillReceiveProps',
        'shouldComponentUpdate',
        'componentWillUpdate',
        'UNSAFE_componentWillUpdate',
        'getSnapshotBeforeUpdate',
        'componentDidUpdate',
        'componentDidCatch',
        'componentWillUnmount'
      ],
      'rendering': ['/^render.+$/', 'render']
    },
    'order': [
      'static-variables',
      'static-methods',
      'instance-variables',
      'lifecycle',
      '/^on.+$/',
      'getters',
      'setters',
      '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
      'instance-methods',
      'everything-else',
      'rendering'
    ]
  }],
  'react/sort-prop-types': [0, {
    'callbacksLast': false,
    'ignoreCase': true,
    'requiredFirst': false,
    'sortShapeProp': true
  }],
  'react/state-in-constructor': [2, 'always'],
  'react/static-property-placement': [2, 'property assignment'],
  'react/style-prop-object': 2,
  'react/void-dom-elements-no-children': 2
};
