import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // Configuration for ignored files
  { ignores: ['dist'] }, // Ignore the 'dist' directory
  {
    // Extend recommended configurations
    extends: [js.configs.recommended, ...tseslint.configs.recommended],

    // Apply configuration to specific file types
    files: ['**/*.{ts,tsx}'],

    // Specify language options
    languageOptions: {
      ecmaVersion: 2020, // Use ECMAScript 2020 features
      globals: globals.browser, // Include browser global variables
    },

    // Specify plugins
    plugins: {
      'react-hooks': reactHooks, // Plugin for React Hooks rules
      'react-refresh': reactRefresh, // Plugin for React Fast Refresh
      import: importPlugin, // Plugin for import/export rules
      prettier, // Plugin for Prettier integration
    },

    // Define custom rules
    rules: {
      ...reactHooks.configs.recommended.rules, // Include recommended React Hooks rules
      'react-refresh/only-export-components': [
        'warn', // Warn if components aren't exported correctly
        { allowConstantExport: true }, // Allow constant exports
      ],
      'unicorn/no-nested-ternary': 'off', // Allow nested ternary operators
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }], // Error for unused variables, ignoring unused function arguments
      'no-console': 'warn', // Disallow console statements
      'import/no-default-export': 'off', // Allow default exports
      '@typescript-eslint/no-explicit-any': "off",
      'import/order': [
        'error',
        {
          'newlines-between': 'always', // Enforce newlines between groups of imports
          groups: [
            ['builtin', 'external'], // Built-in modules (e.g., fs, path) and external libraries
            ['internal'], // Internal project modules
            ['parent', 'sibling', 'index'], // Relative imports: parent, sibling, and index files
            ['unknown'], // Unknown or unclassified imports
          ],
        },
      ],
      'prettier/prettier': [
        'error', // Enforce Prettier formatting rules
        {
          trailingComma: 'es5', // Add trailing commas where valid in ES5
          arrowParens: 'always', // Always include parentheses in arrow functions
          bracketSpacing: true, // Include spaces inside object braces
          endOfLine: 'lf', // Use line feed (\n) for line endings
          insertPragma: false, // Do not insert pragma at the top of files
          proseWrap: 'preserve', // Preserve wrapping for markdown and other prose
          quoteProps: 'as-needed', // Only quote object properties when necessary
          semi: true, // Use semicolons
          singleQuote: true, // Use single quotes
          tabWidth: 2, // Indent with 2 spaces
          plugins: ['prettier-plugin-tailwindcss']
        },
      ],
    },

    // Additional settings
    settings: {
      react: {
        version: 'detect', // Automatically detect the installed React version
      },
    },
  },
);