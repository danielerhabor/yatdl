module.exports = {
  env: {
    es2022: true,
    node: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'google',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json'
      },
      node: true
    }
  },
  rules: {
    'prettier/prettier': 'error',
    'require-jsdoc': 'off'
  }
};
