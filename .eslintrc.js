module.exports = {
    "parser": "@typescript-eslint/parser",
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "jsx": true,
        "useJSXTextNode": true
    },
    "plugins": [
        "@typescript-eslint/eslint-plugin"
      ],
    "rules": {
        "no-unused-vars": "warn"
    }
};