
//import config from "eslint-config-standard";
import jest from 'eslint-plugin-jest';
import js from "@eslint/js";

export default [
  js.configs.recommended,
  { 
    files: [
      "app/**/*.js"
    ], 
    languageOptions: { 
      sourceType: "commonjs" 
    }
  },
  {
    files: ['test/**'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/prefer-expect-assertions': 'off',
    },
  },
  // you can also configure jest rules in other objects, so long as some of the `files` match
  {
    files: ['test/**'],
    rules: { 'jest/prefer-expect-assertions': 'off' },
  }//,
  //...[].concat(config)
];