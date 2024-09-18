import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'linebreak-style': 0,
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'always'],
      'operator-linebreak': 0,
    },
  },
];
