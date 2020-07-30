module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': [0, { "allow": "single-child" }],
    'no-console': 'off',
    'react/prefer-stateless-function': [0, { "ignoreComponents": true }],
    'react/destructuring-assignment': [0,"never", { "ignoreClassFields": true }]
    'no-param-reassign': 'off'
  },
};
