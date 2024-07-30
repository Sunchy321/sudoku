const path = require('path');

module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
  // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
  // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
      extraFileExtensions: ['.vue'],
      project: path.join(__dirname, './tsconfig.json'),
  },

  env: {
    browser: true,
    es2021: true,
    node: true
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    // 'eslint:recommended',

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint typescript rules
    'plugin:@typescript-eslint/recommended',

    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
    // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
    // 'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

      'airbnb-base'
  ],

  plugins: [
    // required to apply rules which need type information
    '@typescript-eslint',

    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
    // required to lint *.vue files
      'vue'
    ],

    overrides: [
        {
            files: ['.eslintrc.cjs', 'quasar.conf.js'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],

  globals: {
    ga: 'readonly', // Google Analytics
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly'
  },

  // add your custom rules here
  rules: {
      'arrow-parens': 'off',
      'brace-style': 'off',
      'class-methods-use-this': 'off',
      'comma-dangle': 'off',
      'comma-spacing': 'off',
      'func-call-spacing': 'off',
      'func-names': 'off',
      'indent': 'off',
      'keyword-spacing': 'off',
      'lines-between-class-members': 'off',
      'max-classes-per-file': 'off',
      'no-await-in-loop': 'off',
      'no-console': 'off',
      'no-continue': 'off',
      'no-else-return': 'off',
      'no-implied-eval': 'off',
      'no-lonely-if': 'off',
      'no-nested-ternary': 'off',
      'no-param-reassign': 'off',
      'no-shadow': 'off',
      'no-underscore-dangle': 'off',
      'no-unused-expressions': 'off',
      'no-use-before-define': 'off',
      'object-curly-spacing': 'off',
      'quotes': 'off',
      'semi': 'off',
      'space-before-function-paren': 'off',
      'space-infix-ops': 'off',

      'key-spacing': ['warn', { beforeColon: false, afterColon: true, align: 'value' }],
      'no-void': ['error', { allowAsStatement: true }],
      'quote-props': ['warn', 'consistent-as-needed'],

      'max-len': ['warn', 150, 4, {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
      }],

      'generator-star-spacing': ['error', {
          before: false,
          after: true,
          anonymous: 'neither',
          method: { before: false, after: true },
      }],

      'prefer-destructuring': ['warn', {
          array: false,
          object: true,
      }],

      'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],

    'import/extensions': 'off',
    'import/no-unresolved': 'off',
      'import/order': 'off',
    'import/prefer-default-export': 'off',

      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/func-call-spacing': 'warn',
      '@typescript-eslint/keyword-spacing': 'warn',
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/prefer-for-of': 'warn',
      '@typescript-eslint/prefer-function-type': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/semi': 'error',
      '@typescript-eslint/sort-type-constituents': 'warn',
      '@typescript-eslint/space-infix-ops': 'warn',
      '@typescript-eslint/type-annotation-spacing': 'warn',
      '@typescript-eslint/no-implied-eval': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/prefer-includes': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-regexp-exec': 'warn',
      '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
      '@typescript-eslint/promise-function-async': 'warn',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',

      '@typescript-eslint/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
      '@typescript-eslint/comma-dangle': ['warn', 'always-multiline'],
      '@typescript-eslint/comma-spacing': ['warn', { before: false, after: true }],
      '@typescript-eslint/indent': ['warn', 4, { SwitchCase: 0 }],
      '@typescript-eslint/lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
      '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^(_{1,3})$' }],
      '@typescript-eslint/object-curly-spacing': ['warn', 'always'],
      '@typescript-eslint/quotes': ['error', 'single'],

      '@typescript-eslint/member-delimiter-style': ['warn', {
          multiline: {
              delimiter: 'semi',
              requireLast: true,
          },
          singleline: {
              delimiter: 'comma',
              requireLast: false,
          },
          multilineDetection: 'brackets',
      }],

      '@typescript-eslint/no-shadow': ['error', {
          allow: [
              'a', 'b', 'c', 'd', 'e',
              'f', 'g', 'h', 'i', 'j',
              'k', 'l', 'm', 'n', 'o',
              'p', 'q', 'r', 's', 't',
              'u', 'v', 'w', 'x', 'y', 'z',
          ],
      }],

      '@typescript-eslint/space-before-function-paren': ['warn', {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
      }],

      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/component-tags-order': 'off',

      'vue/block-order': ['warn', { order: ['template', 'script', 'style'] }],
      'vue/html-indent': ['warn', 4],
      'vue/no-unused-properties': ['warn', { groups: ['setup'] }],
  }
}
