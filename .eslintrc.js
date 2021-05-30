module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:nuxt/base',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2, {
      ignoredNodes: ['TemplateLiteral'],
    }],
    'max-len': ['error', { 'code': 120 }],
    'no-empty-pattern': 'off',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-undef': 'off',
    'no-unused-expressions': 'off',
    'object-curly-spacing': ['error', 'always'],
    'prefer-template': 1,
    'space-before-function-paren': ['error', 'never'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'template-curly-spacing': 'off',
    'vue/comment-directive': 'off',
    'vue/html-indent': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },
}
