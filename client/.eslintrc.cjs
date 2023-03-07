module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
    ecmaVersion: 2018,
    sourceType: "module",
  },
  extends: ["@nuxtjs/eslint-config", "plugin:prettier/recommended"],
  plugins: [],
  rules: {
    "no-unused-vars": "off",
    "no-undef": "off",
  },
};
