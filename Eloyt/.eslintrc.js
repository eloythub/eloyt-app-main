module.exports = {
  "env": {
    "es6": true,
    "node": true,
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "objectLiteralComputedProperties": true,
      "objectLiteralDuplicateProperties": true,
      "objectLiteralShorthandMethods": true,
      "objectLiteralShorthandProperties": true,
      "jsx": true,
    },
    "sourceType": "module",
  },
  "plugins": [
    "react",
    "transform-class-properties",
  ],
  "rules": {

    "indent": [
      "warn",
      2,
    ],
    "quotes": ["error", "single", {"allowTemplateLiterals": true}],
    "semi": [
      "error",
      "always",
    ],
    "init-declarations": "off",
    "no-console": "warn",
    "no-inline-comments": "off",
    "comma-dangle": ["warn", "always-multiline"],
  },
  "settings": {
    "react": {
      "createClass": "createClass", // Regex for Component Factory to use, default to "createClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "15.0" // React version, default to the latest React stable release
    }
  }
};