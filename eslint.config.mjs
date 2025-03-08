import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    files: ['**/*.js'], languageOptions: {
      sourceType: 'commonjs',
      globals: {
        'logger': true,
        '_': true
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
  pluginJs.configs.recommended,
  {
    rules: {
      semi: 'error',
      quotes: ['error', 'single'],
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'keyword-spacing': 'warn',
      'no-trailing-spaces': 'warn',
      'camelcase': 'error',
      'no-console': 'error',
      //controlli di formattazione
      'consistent-return': 2,
      'no-else-return': 1,
      'space-unary-ops': 2,
      'max-len': ['error', { 'code': 110, 'ignoreUrls': true, 'ignoreComments': true }],
      'max-depth': ['error', 4]
      //plugin
    }
  },
  {
    //escludere alcuni controlli da alcuni file/cartelle
    files: ['**/*.test.js', 'documentation/**'],
    rules: {
      'no-console': 'off',
      'no-undef': 'off'
    }
  }
];