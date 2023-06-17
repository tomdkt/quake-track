module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'mocha',
    '@typescript-eslint',
    'unused-imports',
    'sonarjs',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'mocha/no-async-describe': 'error',
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-identical-title': 'warn',
    'mocha/no-pending-tests': 'error',
    'mocha/no-return-from-async': 'error',
    'mocha/no-nested-tests': 'error',
    'mocha/no-sibling-hooks': 'error',
    'mocha/no-skipped-tests': 'error',
    'no-unused-vars': 'off', // to prevent conflict with unused-imports
    'unused-imports/no-unused-imports-ts': 'error',
    'unused-imports/no-unused-vars-ts': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    'curly': 'error',
    'prettier/prettier': ['error'],
    'quotes': ['error', 'single', { avoidEscape: true }], // https://github.com/prettier/prettier/issues/2996
    'prefer-object-spread': 'error',
    'object-shorthand': ['error', 'always'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
        '@typescript-eslint/explicit-member-accessibility': 'error',
        '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
        '@typescript-eslint/no-unused-vars': 'off', // to prevent conflict with unused-imports
        '@typescript-eslint/return-await': 'error',
        'no-return-await': 'off', // to avoid conflicts with @typescript-eslint/return-await
      },
    },
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      rules: {
        'sonarjs/no-duplicate-string': 'error',
      },
    },
  ],
};
