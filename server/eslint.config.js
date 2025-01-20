import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      import: pluginImport,
      prettier,
    },
    rules: {
      'import/extensions': [
        'error',
        'always', // Require file extensions
        {
          js: 'always', // Require `.js` extensions
          ts: 'never', // Skip `.ts` extensions
        },
      ],

      // Other rules
      'unicorn/no-nested-ternary': 'off',
      'no-console': 'off',
      'import/no-default-export': 'off',
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
        },
      ],
    },
  },
];
