module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    NodeJS: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 'off',
    'spaced-comment': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'class-methods-use-this': 'off',
    'lines-between-class-members': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'import/order': [
      'error',
      {
        groups: ['type', 'index', 'sibling', 'parent', 'internal', 'external', 'builtin', 'object']
      }
    ],
    'import/extensions': [
      'error',
      {
        ts: 'never',
        model: 'off',
        middleware: 'off',
        service: 'off',
        controller: 'off',
        interface: 'off'
      }
    ],
    'no-underscore-dangle': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts', '.d.ts', '.tsx']
      }
    }
  },
  ignorePatterns: ['*.d.ts']
};
