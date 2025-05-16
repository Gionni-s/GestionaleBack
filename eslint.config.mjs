import globals from 'globals';
import pluginJs from '@eslint/js';

/** ESLint Configuration */
export default [
  // Base config for all JS files
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        logger: true,
        _: true,
        ...globals.node
      }
    }
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.node
    }
  },

  // Recommended rules from ESLint
  pluginJs.configs.recommended,

  // Global rules
  {
    rules: {
      // Stylistic rules
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'camelcase': ['error', { properties: 'always' }],
      'keyword-spacing': ['warn', { before: true, after: true }],
      'space-unary-ops': ['error', { words: true, nonwords: false }],
      'no-trailing-spaces': 'warn',
      'max-len': ['error', { code: 200, ignoreUrls: true, ignoreComments: false }],
      'max-depth': ['warn', 3],

      // Code quality
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-console': 'error',
      'consistent-return': 'error',
      'no-else-return': ['warn', { allowElseIf: false }],
      // 'no-magic-numbers': ['warn', { ignore: [0, 1], ignoreArrayIndexes: true, enforceConst: true }],
      'prefer-const': ['error', { destructuring: 'all' }],
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'no-nested-ternary': 'error',
      'no-empty-function': 'warn',
      'no-lone-blocks': 'warn',
      'no-unneeded-ternary': 'warn',
      'object-shorthand': ['warn', 'always'],
      'arrow-body-style': ['warn', 'as-needed'],
      'yoda': ['warn', 'never'],
      'curly': ['error', 'all'],

      // Clean code
      'default-case': 'warn',
      'no-duplicate-imports': 'error',
      'no-useless-return': 'warn',
      'no-implicit-coercion': ['warn', { boolean: true, string: true, number: true }]
    }
  },

  // Test and documentation exceptions
  {
    files: ['**/*.test.js', 'documentation/**'],
    rules: {
      'no-console': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off'
    }
  }
];
