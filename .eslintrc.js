module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:nuxt/base'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'comma-dangle': 'off',
    indent: [1, 2, {
      ignoredNodes: ['TemplateLiteral'],
    }],
    'no-empty-pattern': 'off',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-undef': 'off',
    'no-unused-expressions': 'off',
    'object-curly-spacing': [1, 'always'],
    'prefer-template': 1,
    quotes: [1, 'single'],
    semi: [1, 'never'],
    'template-curly-spacing': 'off',
    'vue/comment-directive': 'off',
    'vue/html-indent': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },
}
