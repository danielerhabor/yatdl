module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'google',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest'
    // sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  rules: {
    // increase the severity of rules so they are auto-fixable
    'prettier/prettier': 'error',
    'require-jsdoc': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
};
