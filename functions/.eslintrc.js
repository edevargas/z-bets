module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'arrow-parens': ['error', 'always'],
    'comma-dangle': 'off',
    indent: [1, 2, {
      ignoredNodes: ['TemplateLiteral'],
    }],
    'max-len': [1, { 'code': 120 }],
    'no-empty-pattern': 'off',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-undef': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': ['error', { 'args': 'none' }],
    'object-curly-spacing': [1, 'always'],
    'prefer-template': 1,
    'space-before-function-paren': ['error', 'never'],
    quotes: [1, 'single'],
    semi: [1, 'always'],
    'template-curly-spacing': 'off',
  },
};
