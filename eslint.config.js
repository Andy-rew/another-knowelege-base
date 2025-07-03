const eslint = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettierPlugin = require('eslint-plugin-prettier');
const unusedImportsPlugin = require('eslint-plugin-unused-imports');

module.exports = [
  eslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['.eslintrc.js'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        // заменяет "env: { node: true, jest: true }"
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        jest: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
    },
  },
];
